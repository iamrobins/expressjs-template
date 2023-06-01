import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import expressSitemapXml from "express-sitemap-xml";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
});
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(
  express.static("public", {
    maxAge: process.env.NODE_ENV === "development" ? 0 : 2630000000,
  })
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  expressSitemapXml(() => ["/", "/about", "/disclaimer"], "https://example.com")
);

app.get("/", async (req, res) => {
  return res.render("pages/index", {
    title: "Rating",
  });
});

app.get("*", async (req, res) => {
  res.render("pages/404", {
    title: `404 - Not Found`,
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
