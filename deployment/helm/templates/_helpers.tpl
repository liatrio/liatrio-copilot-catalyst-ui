{{/*
Expand the name of the chart.
*/}}
{{- define "dks-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "dks-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "dks-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "dks-ui.labels" -}}
helm.sh/chart: {{ include "dks-ui.chart" . }}
app: {{ include "dks-ui.name" . }}
version: {{ default .Chart.AppVersion .Values.tag }}
{{ include "dks-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "dks-ui.annotations" -}}
{{- include "dks-ui.liatrioAnnotations" . }}
{{- end }}


{{/*
Selector labels
*/}}
{{- define "dks-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dks-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
liatrio annotations
*/}}
{{- define "dks-ui.liatrioAnnotations" -}}
{{- if .Chart.Maintainers }}
liatrio.com/managed-by-team: {{ (index .Chart.Maintainers 0).Name  }}
{{- end -}}
{{- if .Chart.Home }}
liatrio.com/url: {{ .Chart.Home }}
{{- end -}}
{{- end -}}

{{/*
Image Repository
*/}}
{{- define "dks-ui.container" -}}
{{- if .Values.image.registry }}
    {{- .Values.image.registry -}}
    /
{{- end -}}
{{- .Values.image.repository -}}
:
{{- .Values.image.tag | default .Chart.AppVersion }}
{{- end -}}
