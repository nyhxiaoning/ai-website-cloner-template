"use client";

import {
  LandmarkIcon,
  MapPinIcon,
  FlameIcon,
  ClockIcon,
  TicketIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  HeartOutlineIcon,
  ChevronRightIcon,
  FootprintsIcon,
} from "./icons";

export interface PlaceCardData {
  level: string;
  title: string;
  location: string;
  type: string;
  trend: string;
  description: string;
  duration: string;
  price: string;
  coverClass: string;
}

export default function PlaceCard({ card }: { card: PlaceCardData }) {
  return (
    <article className="place-card" role="button" tabIndex={0}>
      {/* Cover */}
      <div className={`place-cover ${card.coverClass}`}>
        <div className="image-placeholder">
          <LandmarkIcon />
        </div>
        <span className="level-badge">{card.level}</span>
      </div>

      {/* Content */}
      <div className="place-body">
        <div className="place-header">
          <h3>{card.title}</h3>
          <div className="place-actions-top">
            <button className="icon-btn-sm" aria-label={`标记去过${card.title}`}>
              <FootprintsIcon />
            </button>
            <button className="icon-btn-sm" aria-label="收藏景点">
              <HeartOutlineIcon />
            </button>
          </div>
        </div>

        <div className="place-tags">
          <span className="location-tag">
            <MapPinIcon />
            {card.location}
          </span>
          <i>{card.type}</i>
          {card.trend && <i className="trend-tag"><FlameIcon />{card.trend}</i>}
        </div>

        <small className="place-desc">{card.description}</small>

        <div className="place-meta">
          <span>
            <ClockIcon />
            {card.duration}
          </span>
          <span>
            <TicketIcon />
            {card.price}
          </span>
        </div>

        <div className="place-actions-bottom">
          <div className="vote-group">
            <button className="vote-btn">
              <ThumbsUpIcon />
              <span>0</span>
            </button>
            <button className="vote-btn">
              <ThumbsDownIcon />
              <span>0</span>
            </button>
          </div>
          <ChevronRightIcon className="card-chevron" />
        </div>
      </div>
    </article>
  );
}
