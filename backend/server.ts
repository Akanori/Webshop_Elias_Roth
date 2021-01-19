import { Application, send, Router } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { ProductInterface } from "./productInterface.ts";
import { products } from "./products.ts";

const app = new Application();

let cart:ProductInterface[] = [];

const session = new Session({ framework: "oak" });
await session.init();

app.use(session.use()(session));

const router = new Router();

router
  .get("/api/products", async context => {
    context.response.body = {products,};

    context.response.status = 200;
  })
  .get("/api/product", async context => {
    let product = products;
    let id = await context.state.session.get("currProd");
    product = product.filter(x => x.id == id);

    context.response.body = {
      product,
    }

    context.response.status = 200;
  })
  .put("/session/:id", async context => {
    await context.state.session.set("currProd", context.params.id);

    context.response.status = 200;
  })
  .put("/cart/:id/:action", async context => {
      let product = products;
      product = product.filter(x => x.id == context.params.id);
  
      cart.push(product);

    context.response.status = 200;
  })
  .get("/cart", async context => {
    
    //ab hier stuck

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