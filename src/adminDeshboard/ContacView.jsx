import { useEffect, useState } from "react";
import { FiMessageSquare, FiTrash2, FiX, FiUsers } from "react-icons/fi";
import { getAllContacts, deleteContact } from "../api/apiRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactView = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);


  /* ================= GET CONTACTS ================= */

  const fetchContacts = async () => {

    try {

      setLoading(true);

      const res = await getAllContacts();

      console.log("API DATA:", res);

      const contactsData = Array.isArray(res.data) ? res.data : res;

      setContacts([...contactsData].reverse());

    } catch (error) {

      console.error("Error fetching contacts", error);

      toast.error("Failed to load contacts ❌");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchContacts();
  }, []);



  /* ================= MODAL HANDLERS ================= */

  const openMessageModal = (contact) => {
    setSelectedContact(contact);
    setShowMessageModal(true);
  };

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowMessageModal(false);
    setShowDeleteModal(false);
    setSelectedContact(null);
  };


  /* ================= DELETE CONTACT ================= */

  const handleDeleteContact = async () => {

    try {

      await deleteContact(selectedContact._id);

      setContacts((prev) =>
        prev.filter((c) => c._id !== selectedContact._id)
      );

      toast.success("Contact deleted successfully 🗑️");

      closeModal();

    } catch (error) {

      console.error("Delete failed", error);

      toast.error("Failed to delete contact ❌");

    }

  };


  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading contacts...
      </div>
    );
  }


  /* ================= UI ================= */

  return (

    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-[#833ab4] mb-6 flex items-center gap-3">
        <FiUsers className="text-[#20c997]" size={32} />
        Contact View
      </h1>


      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">

        <table className="min-w-full border border-gray-200">

          <thead className="bg-[#833ab4] text-white">

            <tr>
              <th className="px-4 py-3 text-left">SNo.</th>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>

          </thead>


          <tbody>

            {contacts.length === 0 ? (

              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No contacts found
                </td>
              </tr>

            ) : (

              contacts.map((contact, index) => (

                <tr
                  key={contact._id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">
                    {contact.firstName || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {contact.lastName || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {contact.email || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {contact.phone || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {contact.subject || "-"}
                  </td>


                  <td className="px-4 py-3">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => openMessageModal(contact)}
                        className="text-[#20c997] hover:text-green-700"
                        title="View Message"
                      >
                        <FiMessageSquare size={20} />
                      </button>


                      <button
                        onClick={() => openDeleteModal(contact)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 size={20} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>



      {/* MESSAGE MODAL */}

      {showMessageModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-bold text-[#833ab4]">
                Message from {selectedContact?.firstName}
              </h2>

              <button onClick={closeModal}>
                <FiX size={22} />
              </button>

            </div>


            <div className="border rounded-md p-3 bg-gray-50 text-gray-700 break-words whitespace-pre-wrap max-h-60 overflow-y-auto">

              {selectedContact?.message || "No message provided"}

            </div>


            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#20c997] text-white rounded-md"
              >
                OK
              </button>

            </div>

          </div>

        </div>

      )}



      {/* DELETE MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Delete Contact
            </h2>

            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedContact?.email}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteContact}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      <ToastContainer position="top-right" autoClose={3000} />

    </div>

  );
};

export default ContactView;