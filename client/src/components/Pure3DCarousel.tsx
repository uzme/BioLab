import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, FlaskConical, Heart, Pause, Play } from "lucide-react";
import { equipment, type Equipment } from "@/lib/equipmentData";
import { equipmentImages } from "@/lib/equipmentImages";
import { getImageBackgroundProfile, getImagePresentation } from "@/lib/equipmentImagePresentation";
import "./Pure3DCarousel.css";

type CarouselStyle = CSSProperties & {
  "--n"?: number;
  "--i"?: number;
  "--rotation"?: string;
};

type Pure3DCarouselProps = {
  onSelectDevice: (device: Equipment) => void;
  isBookmarked: (deviceId: string) => boolean;
  onToggleBookmark: (deviceId: string) => void;
};

export default function Pure3DCarousel({ onSelectDevice, isBookmarked, onToggleBookmark }: Pure3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [manualRotation, setManualRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startRotation: 0, moved: false });
  const pageSize = 12;
  const totalPages = Math.ceil(equipment.length / pageSize);
  const pageEquipment = equipment.slice(currentIndex * pageSize, (currentIndex + 1) * pageSize);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { startX: event.clientX, startRotation: manualRotation, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = event.clientX - dragRef.current.startX;
    if (Math.abs(deltaX) > 4) dragRef.current.moved = true;
    setManualRotation(dragRef.current.startRotation + deltaX * 0.45);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  return (
    <section
      className="pure3d-carousel my-8 p-5 sm:p-8 lg:p-10"
      aria-label="Asosiy qurilmalar 3D carouseli"
      data-carousel-axis="horizontal"
      data-carousel-motion={isPaused ? "paused" : "running"}
    >
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="carousel-kicker">TANLANGAN QURILMALAR / INTERAKTIV SAHNA</div>
          <h2 className="display carousel-title">Laboratoriya qurilmalari orbitasi</h2>
          <p className="carousel-description">
            Kartalarni gorizontal orbitada ko‘ring, xohlagan qurilmani tanlang va uning SOP darsiga kiring.
          </p>
        </div>
        <div className="carousel-controls flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setCurrentIndex((page) => Math.max(0, page - 1)); setManualRotation(0); }}
            disabled={currentIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#b8d8cc] bg-white text-[#0d7774] shadow-sm transition hover:bg-[#e7f5f1] disabled:cursor-not-allowed disabled:opacity-40"
            title="Oldingi sahifa"
            aria-label="Oldingi carousel sahifasi"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="carousel-page" aria-live="polite">
            <span>TO‘PLAM</span> {currentIndex + 1} <i /> {totalPages}
          </span>
          <button
            type="button"
            onClick={() => { setCurrentIndex((page) => Math.min(totalPages - 1, page + 1)); setManualRotation(0); }}
            disabled={currentIndex === totalPages - 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#b8d8cc] bg-white text-[#0d7774] shadow-sm transition hover:bg-[#e7f5f1] disabled:cursor-not-allowed disabled:opacity-40"
            title="Keyingi sahifa"
            aria-label="Keyingi carousel sahifasi"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((value) => !value)}
            className="carousel-motion-toggle"
            aria-pressed={isPaused}
            aria-label={isPaused ? "Gorizontal aylanishni davom ettirish" : "Gorizontal aylanishni to‘xtatish"}
            title={isPaused ? "Aylanishni davom ettirish" : "Aylanishni to‘xtatish"}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </div>

      {pageEquipment.length > 0 ? (
        <div className="scene" aria-live="polite" data-carousel-scene onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} style={{ cursor: isDragging ? "grabbing" : "grab" }}>
          <div className={`a3d ${isPaused ? "is-paused" : ""} ${manualRotation !== 0 ? "is-manual" : ""}`} style={{ "--n": pageEquipment.length, "--rotation": `${manualRotation}deg` } as CarouselStyle}>
            {pageEquipment.map((device, index) => {
              const image = equipmentImages[device.id];
              const imagePresentation = getImagePresentation(device.id);
              const imageBackgroundProfile = getImageBackgroundProfile(device.id);
              const isPriorityImage = currentIndex === 0 && index < 3;
              const bookmarked = isBookmarked(device.id);

              return (
                <div
                  key={device.id}
                  className="card group cursor-pointer"
                  style={{ "--i": index } as CarouselStyle}
                  role="group"
                  tabIndex={0}
                  onClick={() => { if (dragRef.current.moved) { dragRef.current.moved = false; return; } onSelectDevice(device); }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectDevice(device);
                    }
                  }}
                  aria-label={`${device.name}, ${device.model}, o‘rganish`}
                >
                  <span className="card-shell">
                    <span className="card-media" data-image-profile={imageBackgroundProfile}>
                      {image ? (
                        <>
                          {imagePresentation.fit === "contain" && imageBackgroundProfile === "laboratory" && (
                            <img
                              aria-hidden="true"
                              src={image.url}
                              alt=""
                              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-xl"
                              style={{ objectPosition: imagePresentation.position }}
                            />
                          )}
                          <img
                            src={image.url}
                            alt={image.alt}
                            className={`relative h-full w-full ${imagePresentation.fit === "cover" ? "object-cover" : imageBackgroundProfile === "paper" ? "object-contain p-0" : imageBackgroundProfile === "ink" ? "object-contain p-1 brightness-110 contrast-110" : "object-contain p-2"}`}
                            style={{ objectPosition: imagePresentation.position }}
                            loading={isPriorityImage ? "eager" : "lazy"}
                          />
                        </>
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-[#e5f2ee] text-[#0d7774]">
                          <FlaskConical size={36} />
                        </span>
                      )}
                      <span className="card-code">{device.id}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleBookmark(device.id);
                      }}
                      data-bookmark-button={device.id}
                      aria-pressed={bookmarked}
                      aria-label={bookmarked ? `${device.name} saralanganlardan olib tashlash` : `${device.name} saralanganlarga saqlash`}
                      className={`absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full border shadow-sm backdrop-blur transition ${bookmarked ? "border-[#0d7774] bg-[#0d7774] text-white" : "border-white/80 bg-white/90 text-[#0d7774] hover:border-[#0d7774] hover:bg-[#e3f2e9]"}`}
                    >
                      <Heart size={14} fill={bookmarked ? "currentColor" : "none"} />
                    </button>
                    <span className="card-caption">
                      <span className="card-category">{device.category}</span>
                      <span className="card-name">{device.name}</span>
                      <span className="card-model">{device.model}</span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="carousel-empty">Carousel uchun qurilmalar topilmadi.</div>
      )}
    </section>
  );
}

/* The .scene/.a3d/.card class names intentionally mirror the supplied original sample. */
