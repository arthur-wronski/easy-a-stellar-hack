import React from 'react';
import './ShopOffers.css'; // Custom CSS for styling the cards
import { Button } from '@/components/ui/button'; // Assuming you're using a Button component from your UI library

// Example shop data (you can replace this with API calls or dynamic data later)
const shopData = [
  {
    id: 1,
    name: 'EcoStore',
    offer: 'Buy eco-friendly products and earn 50 KALE tokens',
    logo: 'https://example.com/eco-store-logo.png',
    link: 'https://ecostore.com',
  },
  {
    id: 2,
    name: 'GreenGrocer',
    offer: 'Purchase sustainable groceries and earn 30 KALE tokens',
    logo: 'https://example.com/green-grocer-logo.png',
    link: 'https://greengrocer.com',
  },
  {
    id: 3,
    name: 'SolarTech',
    offer: 'Switch to solar energy and earn 100 KALE tokens',
    logo: 'https://example.com/solar-tech-logo.png',
    link: 'https://solartech.com',
  },
  {
    id: 4,
    name: 'Reforest Initiative',
    offer: 'Donate to reforestation and earn 20 KALE tokens',
    logo: 'https://example.com/reforest-logo.png',
    link: 'https://reforestinitiative.com',
  }
];

const CardRow = () => {
  return (
    <div className="shop-offers-container">
      {shopData.map((shop) => (
        <div key={shop.id} className="shop-card">
          <img src={shop.logo} alt={`${shop.name} Logo`} className="shop-logo" />
          <h3 className="shop-name">{shop.name}</h3>
          <p className="shop-offer">{shop.offer}</p>
          <Button
            variant="outline"
            onClick={() => window.open(shop.link, '_blank')}
            className="shop-button"
          >
            Visit {shop.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CardRow;
