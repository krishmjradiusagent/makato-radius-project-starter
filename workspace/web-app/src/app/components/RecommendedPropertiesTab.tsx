import { Filter, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RecommendedPropertiesTabProps {
  onFilterClick: () => void;
}

export function RecommendedPropertiesTab({ onFilterClick }: RecommendedPropertiesTabProps) {
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
  ];

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#2d2d2d]">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          Recommended (5)
        </h3>
        <button 
          onClick={onFilterClick}
          className="text-[#8a8a8a] hover:text-white transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Property List */}
      <div className="px-4 pt-4 space-y-3">
        {properties.map((property) => (
          <button
            key={property.id}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl overflow-hidden hover:border-[#404040] transition-colors"
          >
            {/* Property Image */}
            <div className="relative h-32 bg-[#2d2d2d]">
              <ImageWithFallback 
                src={property.image}
                alt={property.address}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-white font-semibold text-sm">{property.address}</h4>
                <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0" />
              </div>
              
              <p className="text-white text-lg font-bold mb-2">{property.price}</p>
              
              <div className="flex items-center gap-3 text-[#8a8a8a] text-xs mb-3">
                <span>{property.beds} bds</span>
                <span className="w-1 h-1 rounded-full bg-[#404040]" />
                <span>{property.baths} ba</span>
                <span className="w-1 h-1 rounded-full bg-[#404040]" />
                <span>{property.sqft}</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[#5a5ff2] text-xs font-medium">
                  {property.search}
                </p>
                <span className="text-[#6a6a6a] text-xs">{property.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
