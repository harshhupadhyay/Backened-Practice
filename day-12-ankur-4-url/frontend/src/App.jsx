import axios from "axios";
import { useEffect, useState } from "react";

// const dummyUrls = [
//   {
//     _id: "1",
//     originalUrl:
//       "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
//     shortCode: "IUSJDF",
//     clicks: 9,
//   },
//   {
//     _id: "2",
//     originalUrl:
//       "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
//     shortCode: "IUSJDF",
//     clicks: 5,
//   },
//   {
//     _id: "3",
//     originalUrl:
//       "https://www.amazon.in/s?k=dancing+cactus&i=toys&s=exact-aware-popularity-rank&ds=v1%3Ab%2BSw44ZvzhORklnWYW%2F09u9IzkAIAkk8r5Zql%2Fs3nso&_encoding=UTF8&_encoding=UTF8&content-id=amzn1.sym.b8899ac9-602c-49de-a4d4-9b889f6889d0&crid=3MRAAI2ZAPWM6&pd_rd_r=8b0cb029-bb54-4c28-81f6-f2b616a1e8f4&pd_rd_w=hBCOq&pd_rd_wg=wDI9d&pf_rd_p=b8899ac9-602c-49de-a4d4-9b889f6889d0&pf_rd_r=9FP1P0DKH9QT8JXZ5G0V&qid=1779019626&sprefix=dancing+cact%2Ctoys%2C280&ref=pd_hp_d_r_atf_unk",
//     shortCode: "IUSJDF",
//     clicks: 4,
//   },
// ];
const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  const fetchUrls = async () => {
    const res = await axios.get("http://localhost:5173/api/url");
    const resData = res.data;
    setUrls(resData.data);

    console.log(resData);
  };

  const createShortUrl = async () => {
    let res = await axios.post("http://localhost:5173/api/url", {
      url: inputValue,
    });
    setCurrentUrl({
      originalUrl: res.data.data.originalUrl,
      shortCode: res.data.shortCode,
    });
    setInputValue("")
    fetchUrls();
  };
  const deleteUrl = async (id) => {
    await axios.delete(`http://localhost:5173/api/url/${id}`);
    fetchUrls();
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="flex p-10 flex-col gap-4">
      <div className="border-2 rounded-xl border-yellow-400 p-3 items-centre gap-3 flex  ">
        <input
          className="w-full p-2 border border-yellow-400 rounded-md p-2 focus:outline-none "
          type="text"
          placeholder="paste your link"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="p-1 rounded text-lime-50 bg-amber-600"
          onClick={createShortUrl}
        >
          Shorten
        </button>
      </div>

      <div className=" flex flex-col gap-6">
        {urls.map((val) => {
          return (
            <div
              key={val._id}
              className=" flex gap-8 border-2 rounded-xl border-yellow-400 p-3 justify-evenly items-center"
            >
              <a
                href={`http://localhost:3000/${val.shortCode}`}
                target="_blank"
              >
                {val.shortCode}
              </a>
              <p className="truncate">{val.originalUrl}</p>
              <p>{val.clicks}</p>
              <div className="flex gap-4 ">
                <button className="p-1 rounded  text-lime-50 cursor-pointer  bg-amber-600">
                  Copy
                </button>
                <button
                  className="p-1 rounded text-lime-50 cursor-pointer bg-amber-600"
                  onClick={() => {deleteUrl(val._id)}}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
