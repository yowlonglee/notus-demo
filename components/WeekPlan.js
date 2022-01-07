import PropTypes from 'prop-types';

// components

import TableDropdown from './Dropdowns/TableDropdown.js';

const status = {
  none: '未進行',
  done: '完成',
  skipped: '沒做',
  modified: '課表調整',
  rest: '休息',
};

function getShortDay(date) {
  const day = new Date(date);
  return Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
}
// function getShortMonth(date) {
//   const day = new Date(date);
//   return Intl.DateTimeFormat('en-US', { month: 'short' }).format(day);
// }

function getStatusColor(s) {
  switch (s) {
    case 'none':
      return 'text-blueGray-500';
    case 'done':
      return 'text-emerald-500';
    case 'skipped':
      return 'text-red-500';
    case 'modified':
      return 'text-amber-500';
    case 'rest':
      return 'text-lightBlue-500';
    default:
      return 'text-blueGray-500';
  }
}

export default function WeekPlan({ color, workoutData }) {
  return (
    <div
      className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white'
      }`}
    >
      <div className="block w-full overflow-x-auto rounded-t">
        {/* Week workout table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                }`}
              >
                日期
              </th>
              <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                }`}
              >
                主課表
              </th>
              <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                }`}
              >
                內容
              </th>
              <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                }`}
              >
                狀態
              </th>

              <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                }`}
              />
            </tr>
          </thead>
          <tbody>
            {workoutData.map((dayWorkout) => {
              const date = new Date(dayWorkout.date);
              return (
                <tr key={dayWorkout.date}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={`font-bold mr-3 ${
                        color === 'light' ? 'text-blueGray-600' : 'text-white'
                      }`}
                    >
                      {getShortDay(date)}
                    </span>
                    <span>{date.getDate(date)}</span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {dayWorkout.workout}
                  </td>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    dangerouslySetInnerHTML={{ __html: dayWorkout.detail }}
                  />

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i
                      className={`${getStatusColor(
                        dayWorkout.status
                      )} mr-2 fas fa-circle`}
                    />{' '}
                    {status[dayWorkout.status]}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

WeekPlan.defaultProps = {
  color: 'light',
};

WeekPlan.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
