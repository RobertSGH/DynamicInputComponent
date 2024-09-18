import { useRef } from 'react';
import { useTags } from '../hook/useTags';

const TAGS: string[] = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS'];

const DynamicInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    inputValue,
    tags,
    addTag,
    removeTag,
    handleInputChange,
    error,
    clearInput,
  } = useTags();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim(), true);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === 'Escape') {
      clearInput();
    }
  };

  const handleSuggestionClick = (tagName: string) => {
    addTag(tagName, false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='max-w-2xl mx-auto mt-8 p-4'>
      <div className='mb-2 border border-gray-300 rounded p-3 flex flex-wrap items-center'>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${
              tag.isTyped ? 'bg-transparent' : 'bg-green-800'
            } mb-2 mr-2 px-2.5 py-0.5 rounded-xl flex items-center`}
          >
            {tag.name}
            <button
              type='button'
              onClick={() => removeTag(index)}
              className='bg-transparent hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full ml-1'
            >
              &times;
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`flex-grow outline-none ${error ? 'border-red-500' : ''}`}
          placeholder='Type and press Enter to add'
        />
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <div className='flex flex-wrap mt-2 gap-2'>
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleSuggestionClick(tag)}
            className='px-3 py-1 bg-green-800 rounded-full text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DynamicInput;
