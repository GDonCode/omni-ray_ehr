import { Fragment } from 'react';          // <-- add this import
import { MapPin, Star, Clock } from 'lucide-react';

export default function ServicesHero({
  title = "Premier Dental Services in Montego Bay",
  description = "Complete dental care from routine cleanings to smile transformations. Expert dentists, modern equipment, and flexible scheduling.",
  address = "Overton Plaza, Montego Bay, St. James",
  rating = "4.9 (150+ reviews)",
  hours = "Mon-Fri 10AM-6PM • Sat 9AM-6PM",
  bgColor = "#058080",
  textColor = "#faf9f6",
  accentColor = "#eccb1b",
  titleFont = "",
  bodyFont = "",
}) {
  return (
    <div className="mt-29 p-6 lg:p-0" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:pt-10 lg:pb-10 w-full">
          <h1 className={`${titleFont} text-3xl lg:text-4xl font-bold mb-3 lg:text-center`} style={{ color: textColor }}>
            {title}
          </h1>
          {/* Mobile description */}
          <p className={`${bodyFont} text-lg font-semibold mb-6 lg:hidden lg:text-center`} style={{ color: textColor }}>
            {description}
          </p>
          {/* Desktop description – fixed with keys */}
          <p className={`${bodyFont} text-lg font-semibold mb-8 lg:text-center hidden lg:block`} style={{ color: textColor }}>
            {description.split('.').map((part, i, arr) =>
              i < arr.length - 1 ? (
                <Fragment key={i}>
                  {part}.<br />
                </Fragment>
              ) : (
                <Fragment key={i}>
                  {part}
                </Fragment>
              )
            )}
          </p>

          <div className="flex flex-wrap gap-6 lg:justify-center" style={{ color: textColor }}>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              <span className={`${bodyFont}`}>{address}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" style={{ color: accentColor, fill: accentColor }} />
              <span className={`${bodyFont}`}>{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              <span className={`${bodyFont}`}>{hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}