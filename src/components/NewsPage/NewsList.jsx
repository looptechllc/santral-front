import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import he from "he";
const NewsList = () => {
  const [news, setNews] = useState();
  useEffect(() => {
    fetch("https://api.santral.az/v1/blogs/published?lang=az", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  return (
    <div className=" px-[16px] md:px-[50px] py-[32px]">
      <div>
        <h2 className="text-[24px] md:text-[48px] text-[#424242] text-center">
          Santral xəbərlər
        </h2>
        <p className="my-[16px] text-[24px] text-[#848484] text-center">
          Santralın xəbərlərindən xəbərdar olun!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] py-[40px]">
        {news?.map((item, index) => (
          <NewsCard
            img={`https://cdn.santral.az/images/${item.thumbnail}`}
            title={item.title}
            desc={item.content}
            date={
              item?.date
                ? new Date(item?.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""
            }
            link={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;

const NewsCard = ({ img, title, desc, date, link }) => {
  const decodedDesc = he.decode(desc);

  // Remove HTML tags
  const plainText =
    decodedDesc.replace(/<[^>]+>/g, "").substring(0, 300) + "...";
  return (
    <div className="max-w-[433px] flex flex-col items-start gap-[16px]">
      <img
        src={img}
        alt={title}
        className="w-[433px] h-[295px] object-center rounded-[8px]"
      />
      <div className="flex flex-col items-start gap-[8px]">
        <p className="font-[500]  text-[24px] text-[#333]">{title}</p>
        <p
          className="font-[400] text-[16px] text-[#333] pr-5"
          dangerouslySetInnerHTML={{ __html: plainText }}
        ></p>
      </div>
      <div className="w-full flex items-start justify-between">
        <Link
          to={`/news/${link}`}
          className="font-[500] z-20 px-[16px] py-[8px] rounded-[32px] bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300 flex items-center gap-[10px]"
        >
          Ətraflı oxu{" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
              fill="black"
              fill-opacity="0.87"
            />
          </svg>
        </Link>
        <p className="text-[12px] text-[#333] font-400">{date}</p>
      </div>
    </div>
  );
};
