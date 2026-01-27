import { useEffect } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../utils/thunkApis/stats.apis";
import GrowthBadge from "./growthBadge";

export default function EcommerceMetrics() {
  const dispatch = useDispatch()
  const { userStats } = useSelector(state => state.stats)
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getStats())
    }
    fetch()
  }, [])
  console.log(userStats, "stats")
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {userStats && userStats?.roleCounts.USER}
            </h4>
          </div>

          <div>
            <p>Today</p>
            <GrowthBadge value={userStats?.growth?.users?.today?.percentage} />
          </div>

          <div>
            <p>Week</p>
            <GrowthBadge value={userStats?.growth?.users?.week?.percentage} />
          </div>

          <div>
            <p>Month</p>
            <GrowthBadge value={userStats?.growth?.users?.month?.percentage} />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              FRANCHISE ADMIN
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {userStats && userStats?.roleCounts.FRANCHISE_ADMIN}
            </h4>
          </div>

          <div>
            <p>Today</p>
            <GrowthBadge value={userStats?.growth?.franchise?.today?.percentage} />
          </div>

          <div>
            <p>Week</p>
            <GrowthBadge value={userStats?.growth?.franchise?.week?.percentage} />
          </div>

          <div>
            <p>Month</p>
            <GrowthBadge value={userStats?.growth?.franchise?.month?.percentage} />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              WAREHOUSE ADMIN
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {userStats && userStats?.roleCounts.WAREHOUSE_ADMIN}
            </h4>
          </div>

         

        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div> */}
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
