import React from "react";

export default function Cards() {
  return (
    /* Card 1 */
    <div className="flex space-x-4">
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Card title</h5>
          <p className="mb-6">
            Nike Air Max is a popular line of athletic shoes that feature Nike's
            signature Air cushioning technology in the sole.
          </p>
          <progress
            className="progress progress-secondary w-56"
            value={0}
            max="100"
          ></progress>
          <div className="card-actions">
            <button className="btn btn-dash btn-accent">Belajar Yuk</button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Card title</h5>
          <p className="mb-6">
            Nike Air Max is a popular line of athletic shoes that feature Nike's
            signature Air cushioning technology in the sole.
          </p>
          <progress
            className="progress progress-secondary w-56"
            value={40}
            max="100"
          ></progress>
          <div className="card-actions">
            <button className="btn btn-dash btn-accent">Belajar Yuk</button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Card title</h5>
          <p className="mb-6">
            Nike Air Max is a popular line of athletic shoes that feature Nike's
            signature Air cushioning technology in the sole.
          </p>
          <progress
            className="progress progress-secondary w-56"
            value={70}
            max="100"
          ></progress>
          <div className="card-actions">
            <button className="btn btn-dash btn-accent">Belajar Yuk</button>
          </div>
        </div>
      </div>
    </div>
  );
}
