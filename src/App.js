import txt from "./example_1";
import { useEffect, useState, useCallback, useMemo } from "react";
import Header from "./components/Header/Header";
import CardItem from "./components/CardItem/CardItem";
import Pagination from "./components/Paginate/Pagination";
import { getTotalPageCount, limit } from "./components/lib/getTotalCount";
import Carousel from "./components/Carousel/Carousel";
import Projects from "./components/Projects/Projects";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isPagination, setPagination] = useState(true);

  const initData = useMemo(() => {
    const result = [];
    if (window.DOMParser) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(txt, "text/xml");
      const tags = xmlDoc.getElementsByTagName("vacancy");

      for (let i = 0; i < tags.length; i++) {
        const vacancy = {};
        for (const elem of tags[i].children) {
          const tagName =
            elem.tagName === "job-name" ? "jobName" : elem.tagName;
          vacancy[tagName] = elem.innerHTML.replace(/&gt;/g, "");
        }
        result.push(vacancy);
      }
      setData(result);
    }
    return result;
  }, []);

  const changedData = () => setData([...initData].splice(page * limit - limit, limit));

  const resetData = () => {
    changedData();
    setPagination(true);
  }

  const findNeedVacancy = (params, doSearch) => {
    if (doSearch) {
      const result = initData.filter((item) => {
        let needItem = true;
        if (!!params.position.length) {
          if (
            !item.jobName.includes(params.position) ||
            params.position.length <= 4
          ) {
            needItem = false;
          }
        }
        if (needItem && !!params.salary.length) {
          if (
            !item.salary.includes(params.salary) ||
            params.salary.length <= 4
          ) {
            needItem = false;
          }
        }
        if (needItem && params.withoutSalary) {
          if (!/\d/.test(params.withoutSalary)) {
            needItem = false;
          }
        }
        return needItem;
      });
      setData(result);
      setPagination(false);
    } else {
      resetData();
    }
  };

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? getTotalPageCount(initData.length) : current;
    setPage(next <= total ? next : current);
  }, [page]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;
    setPage(prev > 0 ? prev : current);
  }, [page]);

  useEffect(() => {
    changedData();
  }, [page]);

  return (
    <div id="wrapper-outer">
      <Header findNeedVacancy={findNeedVacancy} resetData={resetData}/>
      <main className="main-container">
        <Carousel />
        <Projects />
        {data?.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </main>
      {!!data.length && isPagination && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(initData.length),
          }}
          nav={{ current: page, total: getTotalPageCount(initData.length) }}
        />
      )}
    </div>
  );
}

export default App;
