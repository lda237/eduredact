import React, { useState } from 'react';
import { Save, Send, Paperclip, MessageSquare } from 'lucide-react';
import { Project } from '../../../types/dashboard';

interface ProjectWorkspaceProps {
  currentProject: Project;
  documentContent: string;
  projectResources: { id: string; title: string; url: string }[];
  onSubmit: (content: string) => void;
  onSaveDraft: (content: string) => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  currentProject,
  documentContent: initialContent,
  projectResources,
  onSubmit,
  onSaveDraft,
}) => {
  const [content, setContent] = useState(initialContent);
  const [messages, setMessages] = useState<{ sender: string; message: string; timestamp: Date }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(content);
  };

  const handleSaveDraft = () => {
    onSaveDraft(content);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        sender: 'Writer',
        message: newMessage,
        timestamp: new Date(),
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Project Details Header */}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold text-gray-900">{currentProject.title}</h1>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span>Deadline: {new Date(currentProject.deadline).toLocaleDateString()}</span>
            <span className={`px-2 rounded-full text-xs font-semibold
              ${currentProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                currentProject.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}`}>
              {currentProject.status}
            </span>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <textarea
              className="w-full h-full p-4 resize-none focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your document here..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t p-4">
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 inline-block mr-2" />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="w-4 h-4 inline-block mr-2" />
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l bg-white">
        {/* Resources Panel */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <div className="space-y-2">
            {projectResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 hover:bg-gray-50 rounded-md"
              >
                <Paperclip className="w-4 h-4 inline-block mr-2 text-gray-500" />
                {resource.title}
              </a>
            ))}
          </div>
        </div>

        {/* Client Communication */}
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Client Communication</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className="font-medium text-sm text-gray-900">{msg.sender}</div>
                <div className="mt-1 text-sm text-gray-700">{msg.message}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};