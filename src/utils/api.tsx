export const performDelete = async (key: string) => {
  let config = {
    method: "DELETE",
    body: JSON.stringify({
      id: key,
    }),
  };

  const res = await fetch("/api/posts", config);
};

export const postFormData = async (data: any) => {
  let config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch("/api/posts", config);
  return res;
};
