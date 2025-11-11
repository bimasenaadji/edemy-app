import uniqid from "uniqid";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import fileUploadIcon from "../../assets/file_upload_icon.svg";
import dropDownIcon from "../../assets/dropdown_icon.svg";
import crossIcon from "../../assets/cross_icon.svg";
import type { Chapter } from "../../types";

const AddCourse = () => {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<string>("0");
  const [discount, setDiscount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [lectureDetails, setLectureDetails] = useState<{
    lectureTitle: string;
    lectureDuration: string;
    lectureUrl: string;
    isPreviewFree: boolean;
  }>({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const addLecture = () => {
    // Buat "papan tulis baru" (array baru)
    const newChapters = chapters.map((chapter) => {
      if (chapter.chapterId !== currentChapterId) {
        return chapter;
      }

      // Jika ini chapter yang benar:
      const newLecture = {
        ...lectureDetails,

        // Ubah durasi dari string (input form) ke number
        lectureDuration: Number(lectureDetails.lectureDuration) || 0,
        lectureOrder:
          chapter.chapterContent.length > 0
            ? chapter.chapterContent[chapter.chapterContent.length - 1]
                .lectureOrder + 1
            : 1,
        lectureId: uniqid(),
      };

      // Kembalikan chapter baru dengan konten baru
      return {
        ...chapter,
        chapterContent: [...chapter.chapterContent, newLecture],
      };
    });

    setChapters(newChapters);
    setShowPopUp(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChapter = (
    action: "add" | "remove" | "toggle",
    chapterId?: string
  ) => {
    if (action === "add") {
      const title = prompt("Enter chapter name : ");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (
    action: "add" | "remove",
    chapterId: string,
    lectureIndex?: number
  ) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === "remove") {
      const newChapter = chapters.map((chapter) => {
        // Jika bukan chapter ini lewati
        if (chapter.chapterId !== chapterId) {
          return chapter;
        }

        // Jika ini chapternya, filter chapter contentnya
        const newChapterContent = chapter.chapterContent.filter(
          (lecture, index) => index !== lectureIndex
        );

        return {
          ...chapter,
          chapterContent: newChapterContent,
        };
      });
      setChapters(newChapter);
    }
  };

  useEffect(() => {
    // Initialize Quill editor
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form className="space-y-3 text-desc" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
              type="number"
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <p>Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 "
            >
              <img
                src={fileUploadIcon}
                alt=""
                className="p-3 bg-surface rounded"
              />
              <input
                type="file"
                name="thumbnailImage"
                id="thumbnailImage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
                accept="image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(Number(e.target.value))}
            type="number"
            value={discount}
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2 w-28 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Adding chapter and lectures */}
        <div>
          {chapters.map((chapter, index) => (
            <div key={index} className="bg-white border rounded-lg  mb-4 ">
              <div className="flex justify-between items-center p-4 border-b ">
                <div className="flex items-center">
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={dropDownIcon}
                    alt=""
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">
                    {index + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                  src={crossIcon}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-surface"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                        src={crossIcon}
                        alt=""
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>

          {showPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails((prev) => ({
                        ...prev,
                        lectureTitle: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 my-4">
                  <p>Preview Free</p>
                  <input
                    type="checkbox"
                    className="mt-1 scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button
                  onClick={addLecture}
                  type="button"
                  className="w-full bg-surface text-white px-4 py-2 rounded"
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopUp(false)}
                  src={crossIcon}
                  alt=""
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
