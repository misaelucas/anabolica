import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
export default function PrevImagesCarousel() {
  return (
    <Carousel
      className="rounded-xl "
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 -translate-y-2/4 left-4"
        >
          <ArrowLeftIcon strokeWidth={2} className="w-6  rounded h-6" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 -translate-y-2/4 !right-4"
        >
          <ArrowRightIcon strokeWidth={2} className="w-6 rounded h-6" />
        </IconButton>
      )}
    >
      <img
        src="https://i.imgur.com/WUckiQV.jpg"
        alt=""
        className="h-80 w-80 object-contain"
      />
      <img
        src="https://i.imgur.com/WUckiQV.jpg"
        alt=""
        className="h-80 w-80 object-contain"
      />
      <img
        src="https://i.imgur.com/WUckiQV.jpg"
        alt=""
        className="h-80 w-80 object-contain"
      />
    </Carousel>
  );
}
