import { Application, send, Router } from "https://deno.land/x/oak/mod.ts";
import { products } from "./products.ts";


const app = new Application();
const router = new Router();

router
  .get("/api/products", async context => {
    context.response.body = {products,};

    context.response.status = 200;
  })
  .get("/api/product/:id", async context => {
    let product = products;
    product = product.filter(x => x.id == context.params.id);

    context.response.body = {
      product,
    }

    context.response.status = 200;
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/../frontend`,
    index: "index.html",
  });
});

app.listen({ port: 8000 });
console.log(`Listening on localhost:${8000}`);