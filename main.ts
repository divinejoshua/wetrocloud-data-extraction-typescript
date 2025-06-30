import Wetrocloud from "wetro-sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const API_SECRET = process.env.WETROCLOUD_API_SECRET || "";

// Initialize Wetrocloud with your API secret
const wetrocloud = new Wetrocloud({ apiKey: API_SECRET });


// Behance data extraction
// Wrap everything in an async function
const behance_data_extraction = async () => {

    console.log("Behance data extraction...");
    const response : any = await wetrocloud.extract({
        website :"https://www.behance.net/gallery/228775029/5-Costa-Rica-inspired-exotic-birds?tracking_source=search_projects&l=2",
        json_schema :[
            { post_title: "Post Title", 
                post_image: "List of project images []" 
            }],
      });

    console.log("Behance data extraction:", JSON.stringify(response));
};


// Dribbble data extraction
const dribbble_data_extraction = async () => {
    console.log("Dribbble data extraction...");
    const response : any = await wetrocloud.extract({
        website :"https://dribbble.com/shots/26205924-Visual-Trip-Wishlist-App",
        json_schema :
            { post_title: "Post Title",
              post_image: "Post image URL",
              profile_email: "Email of the profile",
              profile_phone_number: "Phone number of the profile"
            },
      });

    console.log("Dribbble data extraction:", JSON.stringify(response));
};


// Run the async function
behance_data_extraction();
dribbble_data_extraction();