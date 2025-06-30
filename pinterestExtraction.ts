import Wetrocloud from "wetro-sdk";
import dotenv from "dotenv";
import { extract_images } from "./extractimages";

// Load environment variables from .env file
dotenv.config();
const API_SECRET = process.env.WETROCLOUD_API_SECRET || "";

// Initialize Wetrocloud with your API secret
const wetrocloud = new Wetrocloud({ apiKey: API_SECRET });


// Wrap everything in an async function
const pinterest_extraction = async () => {

    // Set the collection ID
    const collection_id = Math.random().toString(36).substring(2, 15);

    // Create a new collection
    await wetrocloud.createCollection({ collection_id });

    // Extract the images
    const images = await extract_images("https://www.pinterest.com/search/pins/?q=ui%20design");

    // Add a resource to the collection
    await wetrocloud.insertResource({
      collection_id: collection_id,
      resource: images.join("\n"),
      // @ts-ignore
      type: "text",
    });

    // Query the collection
    const response : any= await wetrocloud.queryCollection({
      collection_id: collection_id,
      request_query: "Extract the main images in this post",
      json_schema: {
        images: []
      },
      json_schema_rules: "Extract the main images in this post"
    });

    console.log(response);

};

// Run the async function
pinterest_extraction();