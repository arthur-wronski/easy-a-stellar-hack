import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FundProgress } from "./FundProgress";
import { EarnCards } from "./EarnCards";
import mapsImage from "@/assets/maps.png";
import { Card } from "@/components/ui/card"; // Import Card component
import shopImage from "@/assets/shop.png"; 
import fashion from '@/assets/fashion.png'

export function TabMenu() {
  // Example list of local shops with images, descriptions, and distance
  const localShops = [
    {
      name: "Green Grocer",
      address: "123 Eco St.",
      distance: "0.4 km away",
      description: "Fresh organic produce sourced from local farms.",
      image: shopImage,
    },
    {
      name: "Sustainable Fashion",
      address: "456 Greenway Ave.",
      distance: "0.5 km away",
      description: "Eco-friendly clothing and accessories made from sustainable materials.",
      image: fashion,
    },
    // Add more shops as needed
  ];

  return (
    <Tabs defaultValue="online" className="w-full flex flex-col">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="online">Earn Online</TabsTrigger>
        <TabsTrigger value="local">Earn Locally</TabsTrigger>
        <TabsTrigger value="fund">Fund</TabsTrigger>
      </TabsList>

      <TabsContent value="online">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Earn XLM Tokens Through Sustainable Choices
        </div>
        <EarnCards />
      </TabsContent>

      <TabsContent value="local" className="flex flex-col">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Get discounts and rewards near you
        </div>
        <div className="flex flex-row justify-center mb-4">
          <img
            src={mapsImage}
            className="w-1/2 h-96"
            alt="Map"
          />
          <div className="grid grid-cols-2 gap-4 p-3">
            {localShops.map((shop, index) => (
              <Card key={index} className="flex flex-col shadow-md">
                <img src={shop.image} alt={shop.name} className="flex justify-center w-full h-36 object-cover rounded-t-md" />
                <div className="flex flex-col mt-2 p-2 space-y-4">
                  <h4 className="text-md font-bold">{shop.name}</h4>
                  <p className="text-sm">{shop.address}</p>
                  <p className="text-xs text-gray-500">{shop.distance}</p>
                  <p className="text-sm mt-1">{shop.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="fund">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Fund green projects
        </div>
        <FundProgress />
      </TabsContent>
    </Tabs>
  );
}
