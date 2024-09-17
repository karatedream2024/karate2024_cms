import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { FaEye } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddBlogMutation, useDeleteBlogMutation, useGetAllBlogQuery, useUpdateBlogMutation } from '../../features/api/blogapi';

function Blog() {
  const { data: blogData, error, isLoading } = useGetAllBlogQuery();
  const [addblogapi] = useAddBlogMutation();
  const [updateblogapi] = useUpdateBlogMutation();
  const [deleteblogapi] = useDeleteBlogMutation();
  const [getAddItemModel, setAddItemModel] = useState(false);
  const [blogvalue, setblogvalue] = useState({
    title: '',
    date: '',
    imageUrl: '',
    mini_content: '',
    content: '',
    short_content: ''
  });
  const [addUpdate, setaddUpdate] = useState();
  const openUpdateModal = (blog) => {
    setaddUpdate(blog);
    setAddItemModel(true);
    setblogvalue({
      title: blog.title,
      date: blog.date,
      imageUrl: blog.imageUrl,
      mini_content: blog.mini_content,
      content: blog.content,
      short_content: blog.short_content
    });
  };

  function addblog() {
    if (!addUpdate) {
      addblogapi(blogvalue)
        .then(res => {
          console.log(res.data);
          setAddItemModel(false);
          toast.success('Blog added successfully', {
            autoClose: 2000
          });
        })
        .catch(err => console.log(err));
    } else {
      updateblogapi({ id: addUpdate._id, values: blogvalue })
        .then(res => {
          console.log(res.data);
          setAddItemModel(false);
          toast.success('Blog updated successfully', {
            autoClose: 2000
          });
        })
        .catch(err => console.log(err));
    }
  }

  const deleteblog = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteblogapi({ id: id })
              .then(res => {
                toast.warning('Blog deleted successfully', {
                  autoClose: 2000
                });
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const closeAllModel = () => {
    setAddItemModel(false);
  };

  const [showview, setShowView] = useState(false); // State to show/hide the modal
  const modalRef = useRef();

  // Function to toggle the modal
  const toggleModal = () => {
    setShowView(prev => !prev);
  };

  // Add click event listener to detect clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowView(false);
        setAddItemModel(false);
      }
    };

    if (showview) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showview]);

  return (
    <div className="container mx-auto p-4 relative">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-4">Blog Details</h1>
        {/* Add blog Button */}
        <div className="mb-4 pr-[5%]">
          <button
            onClick={() => {
              setAddItemModel(true);
              setaddUpdate(null);
              setblogvalue({
                title: "",
                date: "",
                imageUrl: "",
                mini_content: "",
                content: "",
                short_content: ""
              });
            }}
            className="bg-transparent hover:bg-logo_yellow text-blue-700 font-semibold hover:text-white py-2 px-4 border border-logo_yellow text-logo_yellow hover:border-transparent rounded"
          >
            Add Blog
          </button>
        </div>
      </div>

      {/* View Blog Modal */}
      <div ref={modalRef} className={`${showview ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">Blog Details</div>
        <div className="md:flex w-[100%] mx-auto">
          <div className="w-[100%] md:w-[50%]">
            <div className="text-logo_green h4">Image</div>
            <div className="flex justify-center">
              <img
                className="h-[300px] w-[300px] rounded-full bg-logo_red"
                src={blogvalue.imageUrl || 'https://defaultimage.url'}
                alt="blog"
              />
            </div>
          </div>
          <div>
            <div>
              <div className="text-logo_green h3">Title</div>
              <div className="h5">{blogvalue.title}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Date</div>
              <div className="h5">{new Date(blogvalue.date).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Mini Content</div>
              <div className="h5">{blogvalue.mini_content}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Short Content</div>
              <div className="h5">{blogvalue.short_content}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Content</div>
              <div className="h5">{blogvalue.content}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogData?.map(blog => (
            <tr key={blog._id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{blog.title}</td>
              <td className="px-4 py-2 text-center">{new Date(blog.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => openUpdateModal(blog)}>
                  <FaCloudUploadAlt className='h-6 w-6 mt-2' />
                </button>
                <button onClick={() => deleteblog(blog._id)}>
                  <RiDeleteBin5Fill className='h-6 w-6 mt-2' />
                </button>
                <button onClick={toggleModal}>
                  <FaEye className='h-6 w-6 mt-2' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Blog Modal */}
      {getAddItemModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">{addUpdate ? 'Edit Blog' : 'Add New Blog'}</h2>
            <div className="mb-4">
              <TextField
                value={blogvalue.title}
                onChange={(e) => setblogvalue({ ...blogvalue, title: e.target.value })}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
            <TextField
                    name="dob"
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={blogvalue.date}
                    onChange={(e) => setblogvalue({ ...blogvalue, date: e.target.value })}
                  />
      
            </div>
            <div className="mb-4">
              <TextField
                value={blogvalue.imageUrl}
                onChange={(e) => setblogvalue({ ...blogvalue, imageUrl: e.target.value })}
                id="outlined-basic"
                label="Image URL"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={blogvalue.mini_content}
                onChange={(e) => setblogvalue({ ...blogvalue, mini_content: e.target.value })}
                id="outlined-basic"
                label="Mini Content"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={blogvalue.short_content}
                onChange={(e) => setblogvalue({ ...blogvalue, short_content: e.target.value })}
                id="outlined-basic"
                label="Short Content"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={blogvalue.content}
                onChange={(e) => setblogvalue({ ...blogvalue, content: e.target.value })}
                id="outlined-basic"
                label="Content"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  closeAllModel();
                  addblog();
                }}
                className="bg-logo_yellow hover:bg-logo_yellow-dark text-white font-semibold py-2 px-4 rounded"
              >
                {addUpdate ? 'Update Blog' : 'Add Blog'}
              </button>
              <button
                onClick={closeAllModel}
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Blog;
