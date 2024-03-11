import React from "react";

const RatingCard = () => {
  return (
    <div>
      <div className="flex items-center mt-4 flex gap-2 ">
        {/* ... (previous star rating components) */}
        <div className="bg-tranparent items-center   rounded-full   ">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1rem] w-[1rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>
        <div className="w-[10rem] h-4  bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-4 bg-yellow-300 rounded"
            style={{ width: "70%" }}
          ></div>
        </div>
        <div className="flex items-center ">
          {/* ... (previous SVG icons) */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          (70%)
        </span>
      </div>
      <div className="flex items-center mt-4 flex gap-2 ">
        {/* ... (previous star rating components) */}
        <div className="bg-tranparent items-center   rounded-full   ">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1rem] w-[1rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>
        <div className="w-[10rem] h-4  bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-4 bg-yellow-300 rounded"
            style={{ width: "60%" }}
          ></div>
        </div>
        <div className="flex items-center ">
          {/* ... (previous SVG icons) */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            4..00
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          (20%)
        </span>
      </div>
      <div className="flex items-center mt-4 flex gap-2 ">
        {/* ... (previous star rating components) */}
        <div className="bg-tranparent items-center   rounded-full   ">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1rem] w-[1rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>
        <div className="w-[10rem] h-4  bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-4 bg-yellow-300 rounded"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="flex items-center ">
          {/* ... (previous SVG icons) */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            3.00
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          (5%)
        </span>
      </div>
      <div className="flex items-center mt-4 flex gap-2 ">
        {/* ... (previous star rating components) */}
        <div className="bg-tranparent items-center   rounded-full   ">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1rem] w-[1rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>
        <div className="w-[10rem] h-4  bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-4 bg-yellow-300 rounded"
            style={{ width: "40%" }}
          ></div>
        </div>
        <div className="flex items-center ">
          {/* ... (previous SVG icons) */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            2.00
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          (3%)
        </span>
      </div>
      <div className="flex items-center mt-4 flex gap-2 ">
        {/* ... (previous star rating components) */}
        <div className="bg-tranparent items-center   rounded-full   ">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1rem] w-[1rem] appearance-none rounded-full border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>
        <div className="w-[10rem] h-4  bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-4 bg-yellow-300 rounded"
            style={{ width: "30%" }}
          ></div>
        </div>
        <div className="flex items-center ">
          {/* ... (previous SVG icons) */}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            1
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          (2%)
        </span>
      </div>
      {/* ... (other star rating components) */}
    </div>
  );
};

export default RatingCard;
