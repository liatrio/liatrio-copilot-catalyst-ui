# Check if there is a file named .env in the current directory
ifneq ("$(wildcard .env)","")
	# Include the contents of the .env file in the Makefile
	include .env
	# Export the variables defined in the .env file
	export
endif

export SHA_TAG = $(shell git rev-parse --short HEAD)

BASE_IMAGE = node:20-alpine
DOCKER_RUN_CMD = docker run --env-file .env --rm -v $(PWD):/app -w /app
## Copilot generated: DOCKER_RUN_CMD = docker run -it --rm -p $(APP_PORT):$(APP_PORT) -v $(PWD):/app -w /app $(APP_NAME):$(SHA_TAG)
NPM_RUN = npm run


help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' Makefile \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

# Extract first target passed to make
CMD := $(wordlist 1,1,$(MAKECMDGOALS))

# Parse additional arguments beyond the first target and store them in a variable for later use
CMD_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

# Don't define any targets if we're just trying to run a miscellaneous npm command
ifneq ($(CMD),npm)

#-- Build and Clean:
## Build the docker image
install: #runs npx install
	$(DOCKER_RUN_CMD) $(BASE_IMAGE) npm install

build: install #build Next.js app inside of the container
	$(DOCKER_RUN_CMD) $(BASE_IMAGE) $(NPM_RUN) build

clean: ## Clean the docker image
##TODO

docker-build: ## Build the docker image
	docker build -t $(APP_NAME):$(SHA_TAG) .


#-- Testing and Scans:
test:   ## Run unit tests
	$(DOCKER_RUN_CMD) $(BASE_IMAGE) $(NPM_RUN) test

functional-test:  ## Run functional tests
##TODO - Add functional test

smoke-test:  ## Run a smoke test against the running application
##TODO - Add smoke test

#-- Execution Control:
up: ## Run the application using Docker Compose
	docker compose up -d $(APP_NAME)

down:# Destroys Docker Compose environment, but preserves volumes
	docker compose down

down-and-volumes: ## Destroys Docker Compose environment including volumes
	docker compose down --volumes

endif

#-- Development Utilities:
npm: ## Run npx commands
	$(DOCKER_RUN_CMD) $(BASE_IMAGE) $(NPM_RUN) $(CMD_ARGS)

deps-check:  ## Check that dependencies are installed and configured correctly
	@echo "Running dependency checks..."; \
	HAS_ERROR=false; \
	if ! make envfile; then \
		HAS_ERROR=true; \
	fi; \
	if ! make local-git-hooks; then \
		HAS_ERROR=true; \
	fi; \
	if [ "$$HAS_ERROR" = "true" ]; then \
		echo "$(COLOR_RED)One or more dependency checks failed and/or requires action from you before proceeding!$(COLOR_RESET)"; \
		echo "$(COLOR_RED)Please review the output above for details.$(COLOR_RESET)"; \
		exit 1; \
	else \
		echo "$(COLOR_GREEN)All dependencies are good to go!$(COLOR_RESET) $(TADA)\n\n"; \
	fi

envfile: ## Create .env file from .env.template
	@echo "Checking for existing .env file..."; \
	HAS_ERROR=false; \
	if [ ! -f ./.env ]; then \
		echo "$(COLOR_YELLOW)No .env file found. Creating from '.env.template'...$(COLOR_RESET)"; \
		if cp ./.env.template ./.env; then \
			echo "$(COLOR_GREEN)'.env' file has been created!$(COLOR_RESET) $(CHECKMARK)"; \
			echo "$(COLOR_CYAN)Please review the values in '.env' and update them as necessary before continuing.$(COLOR_RESET)"; \
			echo "$(COLOR_CYAN)Once you have reviewed and updated the values in '.env' you should be good to proceed!$(COLOR_RESET)"; \
			exit 2; \
				else \
					echo "$(COLOR_RED)Failed to create '.env' file!$(COLOR_RESET)"; \
					exit 1; \
				fi; \
	else \
			echo "Environment file found! $(CHECKMARK)"; \
			echo "Checking for missing keys based on keys defined in '.env.template'..."; \
		ENV_TEMPLATE_KEYS=$$(grep -v '^#' ./.env.template | cut -d '=' -f 1); \
		ENV_KEYS=$$(grep -v '^#' ./.env | cut -d '=' -f 1); \
		echo "$$ENV_TEMPLATE_KEYS" | sort > .env_template_keys_sorted; \
		echo "$$ENV_KEYS" | sort > .env_keys_sorted; \
		ENV_TEMPLATE_KEYS_SUBSET=$$(comm -23 .env_template_keys_sorted .env_keys_sorted); \
		rm .env_template_keys_sorted .env_keys_sorted; \
		if [ -n "$$ENV_TEMPLATE_KEYS_SUBSET" ]; then \
			echo "$(COLOR_RED)Environment file is missing the following keys: $(COLOR_RESET)"; \
			echo "$(COLOR_RED)$$ENV_TEMPLATE_KEYS_SUBSET$(COLOR_RESET)"; \
			HAS_ERROR=true; \
		else \
			echo "Environment file has all required keys! $(CHECKMARK)"; \
		fi; \
	fi; \
	if [ "$$HAS_ERROR" = "false" ]; then \
		echo "$(COLOR_GREEN)Environment file is good to go!$(COLOR_RESET) $(TADA)"; \
	else \
		echo "$(COLOR_RED)\nEnvironment file is not configured correctly!$(COLOR_RESET)"; \
		echo "$(COLOR_RED)Please fix the errors above and try again.$(COLOR_RESET)"; \
		exit 1; \
	fi;

local-git-hooks: ## Setup local Git hooks (see https://pre-commit.com/#install for pre-commit installation instructions)
ifeq ($(CI),true)
	@echo "Running in CI, skipping dependency check"
else
	@echo "Checking for pre-commit binary..."; \
	if [ -z $$(which pre-commit) ]; then \
		echo "$(COLOR_RED)No pre-commit binary found in PATH.$(COLOR_RESET)"; \
		echo "$(COLOR_YELLOW)Please install the pre-commit binary using Homebrew or Python's package manager pip or pip3.$(COLOR_RESET)"; \
		echo "\t$(COLOR_YELLOW)brew install pre-commit$(COLOR_RESET)"; \
		echo "\t$(COLOR_YELLOW)pip3 install pre-commit$(COLOR_RESET)"; \
		echo "$(COLOR_YELLOW)See https://pip.pypa.io/en/stable/installation/ if you don't have pip or pip3$(COLOR_RESET)"; \
		exit 1; \
	else \
		echo "Pre-commit binary found at '$$(which pre-commit)'! $(CHECKMARK)"; \
	fi; \
	echo "Ensuring pre-commit is installed for each hook type defined in '.pre-commit-config.yaml'..."; \
	if pre-commit install --install-hooks --overwrite; then \
		echo "$(COLOR_GREEN)Git hooks are good to go!$(COLOR_RESET) $(TADA)"; \
	else \
		echo "$(COLOR_RED)Git hooks were not configured correctly!$(COLOR_RESET)"; \
		echo "$(COLOR_RED)Please fix the errors above and try again.$(COLOR_RESET)"; \
		exit 1; \
	fi
endif

# NOTE .PHONY denotes that the target does _not_ correspond to any local file of the same name (true of all our targets)
.PHONY: $(MAKECMDGOALS)

# Define color escape codes
COLOR_RESET = \033[0m
COLOR_CYAN = \033[36m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m
COLOR_YELLOW = \033[33m

# Define Unicode characters for emojis
CHECKMARK = \xE2\x9C\x85  # Checkmark emoji
TADA = \xF0\x9F\x8E\x89 # Tada emoji
RED_X = \xE2\x9D\x8C # Red X emoji
