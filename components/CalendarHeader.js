// export function Week({ number }) {
//   return (
//     <button
//       className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//       type="button"
//       key={`week-${number}`}
//     >
//       {number}
//     </button>
//   );
// }

export default function CalendarHeader() {
  // for (let i = 1; i <= weekLength; i++) {
  //   arr.push(<Week number={`${i}`} />);
  // }

  return (
    <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <p className="text-white">Display month here</p>
      </div>
    </div>
  );
}
