function Episodecartoonpage(){
    return(
        <div>
            <div className="w-5/12 m-auto container mx-auto border rounded-lg bg-white px-12 py-12 mb-32">
                <div>
                    <div>ชื่อตอน</div>
                    <div className="border rounded-lg px-4 py-3.5 dark:shadow-gray-900">นัดรัก</div>
                </div>

                <div>
                <img class="w-full h-full object-cover lazy border-2 " src="https://th-test-11.slatic.net/p/c6036ac38bada7f2163c0a8540c0e71b.jpg" alt="Image" />
                <img class="w-full h-full object-cover lazy border-2 " src="https://th-test-11.slatic.net/p/c6036ac38bada7f2163c0a8540c0e71b.jpg" alt="Image" />
                <img class="w-full h-full object-cover lazy border-2 " src="https://th-test-11.slatic.net/p/c6036ac38bada7f2163c0a8540c0e71b.jpg" alt="Image" />

                </div>

                <hr></hr>

                <div className="flex justify-between">
                    <button>ก่อนหน้า</button>
                    <button>ถัดไป</button>
                </div>
            </div>
        </div>
    )
}

export default Episodecartoonpage;