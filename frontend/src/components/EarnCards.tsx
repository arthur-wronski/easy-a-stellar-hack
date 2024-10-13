import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ecoStoreImage from '@/assets/EcoStore_0F8A0047-by-Robin-Smith-copy-scaled.jpg'; 
import patagoniaImage from '@/assets/image.png'
import numiTeaImage from '@/assets/numitea.png'


const shopData = [
  {
    id: 1,
    name: 'EcoStore',
    offer: 'Shop for eco-friendly products and receive 5 XLM tokens',
    logo: ecoStoreImage,
    link: 'https://ecostore.com',
  },
  {
    id: 2,
    name: 'Patagonia',
    offer: 'Buy sustainable clothing and accessories to earn 3 XLM tokens',
    logo: patagoniaImage,
    link: 'https://eu.patagonia.com/',
  },
  {
    id: 3,
    name: 'Numi Tea',
    offer: 'Purchase organic teas and get rewarded with 10 XLM tokens',
    logo: numiTeaImage,
    link: 'https://numitea.com/',
  },
];


export function EarnCards() {
  return (
        <div className="flex flex-wrap justify-center gap-6">
          {shopData.map((shop) => (
            <Card key={shop.id} className="w-80 bg-white shadow-md rounded-lg">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <img src={shop.logo} alt={`${shop.name} logo`} className="h-32 w-64 object-contain" />
                </div>
                <CardTitle className="text-center">{shop.name}</CardTitle>
                <CardDescription className="text-center">{shop.offer}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button onClick={() => window.open(shop.link, '_blank')} variant="outline" className="bg-green-700 text-gray-100 hover:bg-green-900 hover:text-gray-100">
                  Visit {shop.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
  );
}
