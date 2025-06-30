import Wetrocloud from "wetro-sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const API_SECRET = process.env.WETROCLOUD_API_SECRET || "";

// Initialize Wetrocloud with your API secret
const wetrocloud = new Wetrocloud({ apiKey: API_SECRET });


// Wrap everything in an async function
const run = async () => {
    // Set the collection ID
    const collection_id = "unique_id_12345678910";

    // Create a new collection
    await wetrocloud.createCollection({ collection_id });

    // Add a resource to the collection
    await wetrocloud.insertResource({
      collection_id: collection_id,
      resource:
        "https://medium.com/@wetrocloud/how-does-artificial-intelligence-work-1a1fb52e4a56",
      // @ts-ignore
      type: "web",
    });

    // Query the collection
    const response : any= await wetrocloud.queryCollection({
      collection_id: collection_id,
      request_query: "What is the main topic of the article?",
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
    });

    console.log("Streaming response:");
    for await (const chunk of response) {
      console.log(chunk.response);
    }

};

// Run the async function
run();