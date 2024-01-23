import { useNavigate } from "react-router-dom";

function Episode() {

    const navigate = useNavigate();

    const Epfic = () =>{
        navigate("/episodefiction");
    }

    const Eptoon = () =>{
        navigate("/episodecartoon");
    }
    
  return (
    <div>
      <div>ตอนทั้งหมด</div>

      <div>
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start w-20 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                        ตอนที่
                      </th>

                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                        ชืื่อตอน
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      1
                      </td>

                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      นัดรัก
                      </td>
                    </tr>

                    <tr>
                        
                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        1
                      </td>
                      

                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        นัดรัก
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episode;
