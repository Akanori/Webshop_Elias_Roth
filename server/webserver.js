import { Application, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async(context) => {
    await send(context, context.request.url.pathname, {
        root: `/home/vmadmin/Schreibtisch/Webshop_Elias_Roth/webshop/src/`,
        index: "index.html",
    });
});

app.listen({ port: 8000 });
console.log(`Listening on localhost:${8000}`);