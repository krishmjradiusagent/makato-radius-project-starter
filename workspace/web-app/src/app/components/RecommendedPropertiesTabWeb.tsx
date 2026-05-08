import { Filter, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RecommendedPropertiesTabWebProps {
  onFilterClick: () => void;
}

export function RecommendedPropertiesTabWeb({ onFilterClick }: RecommendedPropertiesTabWebProps) {
  const properties = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
      address: '456 Oak Avenue',
      price: '$1,200,000',
      beds: 4,
      baths: 3,
      sqft: '2,208 sqft',
      search: '1640 Riverside Drive, Hill Valley · Rent',
      time: '2h ago',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      address: '456 Oak Avenue',
      price: '$1,200,000',
      beds: 4,
      baths: 3,
      sqft: '2,208 sqft',
      search: '1640 Riverside Drive, Hill Valley · Rent',
      time: '2h ago',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      address: '456 Oak Avenue',
      price: '$1,200,000',
      beds: 4,
      baths: 3,
      sqft: '2,208 sqft',
      search: '1640 Riverside Drive, Hill Valley · Rent',
      time: '2h ago',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      address: '456 Oak Avenue',
      price: '$1,200,000',
      beds: 4,
      baths: 3,
      sqft: '2,208 sqft',
      search: '1640 Riverside Drive, Hill Valley · Rent',
      time: '2h ago',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400',
      address: '742 Evergreen Terrace',
      price: '$895,000',
      beds: 3,
      baths: 2,
      sqft: '1,850 sqft',
      search: 'Downtown Springfield · Buy',
      time: '5h ago',
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
      address: '123 Maple Street',
      price: '$2,100,000',
      beds: 5,
      baths: 4,
      sqft: '3,420 sqft',
      search: 'Luxury Homes · Buy',
      time: '1d ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          Recommended Properties (6)
        </h3>
        <button 
          onClick={onFilterClick}
          className="text-[#737373] hover:text-[#171717] transition-colors p-2 hover:bg-[#f5f5f5] rounded-lg"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-2 gap-5">
        {properties.map((property) => (
          <button
            key={property.id}
            className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#d4d4d4] hover:shadow-md transition-all text-left"
          >
            {/* Property Image */}
            <div className="relative h-48 bg-[#f5f5f5]">
              <ImageWithFallback 
                src={property.image}
                alt={property.address}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-[#171717] font-semibold text-base">{property.address}</h4>
                <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0" />
              </div>
              
              <p className="text-[#171717] text-xl font-bold mb-3">{property.price}</p>
              
              <div className="flex items-center gap-3 text-[#525252] text-sm mb-3">
                <span>{property.beds} beds</span>
                <span className="w-1 h-1 rounded-full bg-[#d4d4d4]" />
                <span>{property.baths} baths</span>
                <span className="w-1 h-1 rounded-full bg-[#d4d4d4]" />
                <span>{property.sqft}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5]">
                <p className="text-[#5a5ff2] text-xs font-medium">
                  {property.search}
                </p>
                <span className="text-[#a3a3a3] text-xs">{property.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
