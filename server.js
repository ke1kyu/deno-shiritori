import { serve } from "https://deno.land/std@0.138.0/http/server.ts";

import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";


let previousWord = "しりとり";

console.log("Listening on http://localhost:8000");

serve(async (req) => {

  const pathname = new URL(req.url).pathname;

  if (req.method === "GET" && pathname === "/shiritori") {

    return new Response(previousWord);

  }

  if (req.method === "POST" && pathname === "/shiritori") {

    const requestJson = await req.json();

    const nextWord = requestJson.nextWord;
    
    

    if (

      nextWord.length > 0 &&

      previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0) &&
            
      nextWord.charAt(nextWord.length - 1) !== "ん"

    ) {

      return new Response("前の単語に続いていません。", { status: 400 });

    }
    
    if(previousWord == nextWord){
    
      return new Response("同じ言葉は使えません",{ status: 400});
      
    }
    
          
    if(nextWord.charAt(nextWord.length - 1) ==="ん"){
      
      return new Response("「ん」で終わったので終了です", { status: 400 }); 
      
    }


    previousWord = nextWord;

    return new Response(previousWord);

  }


  return serveDir(req, {

    fsRoot: "public",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,

  });

});

