import React, { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  JSON_DATA,
  getStateExchangeRate,
  JSON_PARAM,
  setStateExchangeRate,
} from "./exchangeRateSlice";
import LinePlot from "./LinePlot";
import axios from "axios";

const getUrls = (jsonParam) => {
  if (jsonParam == null) {
    return [];
  }
  const { start_date, end_date } = jsonParam;
  const start_year = +start_date.slice(0, 4);
  const end_year = +end_date.slice(0, 4);

  const url = "https://api.exchangerate.host/timeseries";
  const apiUrls = [];
  for (let year = start_year; year <= end_year; year++) {
    let start_day = `${year}-01-01`;
    let end_day = `${year}-12-31`;
    if (year === start_year) {
      start_day = start_date;
    }
    if (year === end_year) {
      end_day = end_date;
    }
    const newJsonParam = {
      ...jsonParam,
      start_date: start_day,
      end_date: end_day,
    };
    const apiUrl = `${url}?${new URLSearchParams(newJsonParam).toString()}`;
    apiUrls.push(apiUrl);
  }
  return apiUrls;
};

const getData = (results) => {
  const datas = results.map((result) => result.data);

  const data = datas.slice(1).reduce((acc, cur) => {
    return {
      base: acc.base,
      motd: acc.motd,
      success: acc.success,
      timeseries: acc.timeseries,
      start_date:
        acc.start_date <= cur.start_date ? acc.start_date : cur.start_date,
      end_date: acc.end_date <= cur.end_date ? cur.end_date : acc.end_date,
      rates: { ...acc.rates, ...cur.rates },
    };
  }, datas[0]);
  return data;
};

const LineChart = () => {
  const dispatch = useDispatch();
  const jsonParam = useSelector(getStateExchangeRate(JSON_PARAM));

  const apiUrls = getUrls(jsonParam);

  const { data: datas, refetch } = useQuery({
    queryKey: ["query"],
    queryFn: () => axios.all(apiUrls.map((apiUrl) => axios.get(apiUrl))),
    refetchOnWindowFocus: false,
    suspense: true,
    enable: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, jsonParam]);

  useEffect(() => {
    const data = getData(datas);
    dispatch(setStateExchangeRate(JSON_DATA, data));
  }, [datas, dispatch]);

  const onRelayout = (e) => {};
  return (
    <Suspense fallback={<div>Loading ...6</div>}>
      <LinePlot onRelayout={onRelayout} />
    </Suspense>
  );
};

export default LineChart;
