import { useState } from 'react';
import { Trash2, Edit, Users, FileText, MessageSquare } from 'lucide-react';

export const PostUser = () => {
  // Mock data
  const [data, setData] = useState({
    users: [
      { id: 1, name: 'Admin', email: 'admin@example.com' },
      { id: 2, name: 'John', email: 'john@example.com' },
    ],
    posts: [
      { id: 1, title: 'First Post', userId: 1 },
      { id: 2, title: 'Second Post', userId: 2 },
    ],
    comments: [
      { id: 1, text: 'Nice post!', postId: 1, userId: 2 },
      { id: 2, text: 'Great content', postId: 2, userId: 1 },
    ],
  });

  const [activeTab, setActiveTab] = useState('posts');

  // Helper function to get user by ID
  const getUserById = (userId) => {
    return data.users.find(user => user.id === userId) || { name: 'Deleted User' };
  };

  // Delete functions
  const deleteItem = (type, id) => {
    setData(prev => {
      // Cascade deletes
      if (type === 'users') {
        return {
          users: prev.users.filter(user => user.id !== id),
          posts: prev.posts.filter(post => post.userId !== id),
          comments: prev.comments.filter(comment => comment.userId !== id),
        };
      } else if (type === 'posts') {
        return {
          ...prev,
          posts: prev.posts.filter(post => post.id !== id),
          comments: prev.comments.filter(comment => comment.postId !== id),
        };
      } else {
        return {
          ...prev,
          comments: prev.comments.filter(comment => comment.id !== id),
        };
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        
        <button 
          onClick={() => setActiveTab('posts')} 
          className={`flex items-center w-full p-2 mb-2 rounded ${activeTab === 'posts' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FileText className="mr-2" size={16} /> Posts
        </button>
        
        <button 
          onClick={() => setActiveTab('comments')} 
          className={`flex items-center w-full p-2 mb-2 rounded ${activeTab === 'comments' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <MessageSquare className="mr-2" size={16} /> Comments
        </button>
        
        <button 
          onClick={() => setActiveTab('users')} 
          className={`flex items-center w-full p-2 rounded ${activeTab === 'users' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <Users className="mr-2" size={16} /> Users
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'posts' && (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold p-4 border-b">Posts Management</h2>
            <div className="divide-y">
              {data.posts.map(post => (
                <div key={post.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500">By: {getUserById(post.userId).name}</p>
                  </div>
                  <button 
                    onClick={() => deleteItem('posts', post.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold p-4 border-b">Comments Management</h2>
            <div className="divide-y">
              {data.comments.map(comment => (
                <div key={comment.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{comment.text}</p>
                    <p className="text-sm text-gray-500">
                      By: {getUserById(comment.userId).name} on Post #{comment.postId}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteItem('comments', comment.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold p-4 border-b">Users Management</h2>
            <div className="divide-y">
              {data.users.map(user => (
                <div key={user.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => deleteItem('users', user.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
