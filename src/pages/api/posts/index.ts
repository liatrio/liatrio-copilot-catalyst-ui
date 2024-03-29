export default async function handler(req: any, res: any) {
  if (process.env["ENABLE_SAMPLE_DATA"]) {
    return res.status(200).json();
  } else if (req.method === "DELETE") {
    if (req.method === "DELETE") {
      try {
        const id = JSON.parse(req.body).id;
        await fetch(process.env["DKS_API_BASE_URL"] + "/posts/" + id, {
          method: "delete",
        });
        return res.status(200).json();
      } catch (e) {
        console.error(e);
        return res.status(500).json();
      }
    }
  } else if (req.method === "POST") {
    try {
      const response = await fetch(
        process.env["DKS_API_BASE_URL"] + "/posts",
        {
          method: "POST",
          headers: req.headers,
          body: JSON.stringify(req.body),
        }
      );
      return res.status(200).json(response.body);
    } catch (e) {
      console.error(e);
      return res.status(500).json();
    }
  }
}
