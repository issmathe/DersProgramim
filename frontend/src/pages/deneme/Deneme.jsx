import React, { useState } from "react";
import Header from "../../components/header/Header";

const Deneme = () => {
  const initialSubjects = {
    turkce: { dogru: 0, yanlis: 0 },
    matematik: { dogru: 0, yanlis: 0 },
    sosyal: { dogru: 0, yanlis: 0 },
    fen: { dogru: 0, yanlis: 0 },
  };

  const [subjects, setSubjects] = useState(initialSubjects);
  const [savedSubjects, setSavedSubjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSubjects, setEditedSubjects] = useState({});

  const calculateNet = (subject) => {
    const { dogru, yanlis } = subject;
    return dogru - yanlis / 4; // Her 4 yanlış 1 doğruyu iptal eder
  };

  const calculateTotalNet = (entry) => {
    let totalNet = 0;
    for (const subject of Object.values(entry.subjects)) {
      totalNet += calculateNet(subject);
    }
    return totalNet;
  };

  const handleChange = (subjectName, field, value) => {
    value = Math.min(Math.max(parseInt(value) || 0, 0), 40);
    setSubjects((prevState) => ({
      ...prevState,
      [subjectName]: {
        ...prevState[subjectName],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const updatedSubjects = { ...subjects };
    setSavedSubjects((prevSavedSubjects) => [
      ...prevSavedSubjects,
      { date: new Date().toLocaleDateString(), subjects: updatedSubjects },
    ]);
    setSubjects(initialSubjects);
  };

  const handleDelete = (index) => {
    setSavedSubjects((prevSavedSubjects) =>
      prevSavedSubjects.filter((_, i) => i !== index)
    );
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const subjectsToEdit = savedSubjects[index].subjects;
    setEditedSubjects(subjectsToEdit);
  };

  const handleEditChange = (subjectName, field, value) => {
    value = Math.min(Math.max(parseInt(value) || 0, 0), 40);
    setEditedSubjects((prevEditedSubjects) => ({
      ...prevEditedSubjects,
      [subjectName]: {
        ...prevEditedSubjects[subjectName],
        [field]: value,
      },
    }));
  };

  const handleEditSave = () => {
    const updatedSavedSubjects = [...savedSubjects];
    updatedSavedSubjects[editingIndex] = {
      ...updatedSavedSubjects[editingIndex],
      subjects: editedSubjects,
    };
    setSavedSubjects(updatedSavedSubjects);
    setEditedSubjects({});
    setEditingIndex(null);
  };

  return (
    <div>
      <Header />
      {/* Ygs sonuçlarım */}
      <div className="flex justify-center py-8">
        <div className="bg-slate-200 p-8 rounded-lg">
          <div className="max-w-screen-md mx-auto">
            <h1 className="bg-blue-400 text-center rounded-sm h-10 p-2">
              YGS NETLERİ
            </h1>
            <div className="rounded-lg shadow-xl p-4 mt-4">
              <table className="table-auto border-collapse border w-full border-gray-800">
                <thead>
                  <tr>
                    <th className="border border-gray-800 p-2">Ders</th>
                    <th className="border border-gray-800 p-2">Doğru</th>
                    <th className="border border-gray-800 p-2">Yanlış</th>
                    <th className="border border-gray-800 p-2">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(subjects).map(
                    ([subjectName, subject], index) => (
                      <tr key={index}>
                        <td className="border border-gray-800 p-2 capitalize">
                          {subjectName}
                        </td>
                        <td className="border border-gray-800 p-2">
                          <select
                            value={subject.dogru}
                            onChange={(e) =>
                              handleChange(subjectName, "dogru", e.target.value)
                            }
                          >
                            {[...Array(41).keys()].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border border-gray-800 p-2">
                          <select
                            value={subject.yanlis}
                            onChange={(e) =>
                              handleChange(
                                subjectName,
                                "yanlis",
                                e.target.value
                              )
                            }
                          >
                            {[...Array(41 - subject.dogru).keys()].map(
                              (value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="border border-gray-800 p-2">
                          {calculateNet(subject)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Deneme Sonuçları */}
      <div className="flex justify-center ">
        <div className=" w-1/2 bg-slate-200">
          <h3 className="bg-blue-400 rounded-sm text-center font-semibold leading-normal mb-2">
            Deneme Sonuçlarım
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border w-full border-gray-800">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-800 p-2">Tarih</th>
                  <th className="border border-gray-800 p-2">Türkçe</th>
                  <th className="border border-gray-800 p-2">Matematik</th>
                  <th className="border border-gray-800 p-2">Sosyal</th>
                  <th className="border border-gray-800 p-2">Fen</th>
                  <th className="border border-gray-800 p-2">Toplam Net</th>
                  <th className="border border-gray-800 p-2">Sil</th>
                  <th className="border border-gray-800 p-2">Düzenle</th>
                </tr>
              </thead>
              <tbody>
                {savedSubjects.map((savedSubject, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-800 p-2">
                      {savedSubject.date}
                    </td>
                    {Object.entries(savedSubject.subjects).map(
                      ([subjectName, subject], index) => (
                        <td key={index} className="border border-gray-800 p-2">
                          {calculateNet(subject)}
                        </td>
                      )
                    )}
                    <td className="border border-gray-800 p-2">
                      {calculateTotalNet(savedSubject)}
                    </td>
                    <td className="border border-gray-800 p-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        Sil
                      </button>
                    </td>
                    <td className="border border-gray-800 p-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(index)}
                      >
                        Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal */}
      {editingIndex !== null && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Ders Düzenle
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {Object.entries(editedSubjects).map(
                        ([subjectName, _], index) => (
                          <div key={index} className="mt-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2 capitalize">
                              {subjectName}
                            </h3>
                            <div className="flex gap-4 mr-7">
                              <div>
                                <label
                                  htmlFor={`editedDogru_${subjectName}`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Doğru Sayısı
                                </label>
                                <select
                                  name={`editedDogru_${subjectName}`}
                                  id={`editedDogru_${subjectName}`}
                                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  value={editedSubjects[subjectName].dogru}
                                  onChange={(e) =>
                                    handleEditChange(
                                      subjectName,
                                      "dogru",
                                      e.target.value
                                    )
                                  }
                                >
                                  {[...Array(41).keys()].map((value) => (
                                    <option key={value} value={value}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label
                                  htmlFor={`editedYanlis_${subjectName}`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Yanlış Sayısı
                                </label>
                                <select
                                  name={`editedYanlis_${subjectName}`}
                                  id={`editedYanlis_${subjectName}`}
                                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  value={editedSubjects[subjectName].yanlis}
                                  onChange={(e) =>
                                    handleEditChange(
                                      subjectName,
                                      "yanlis",
                                      e.target.value
                                    )
                                  }
                                >
                                  {[
                                    ...Array(
                                      41 - editedSubjects[subjectName].dogru
                                    ).keys(),
                                  ].map((value) => (
                                    <option key={value} value={value}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm mr-3"
                    onClick={handleEditSave}
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm ml-3"
                    onClick={() => setEditingIndex(null)}
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deneme;
