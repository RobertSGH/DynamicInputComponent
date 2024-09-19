import { useRef, useState, useEffect } from 'react';
import { useTags } from '../hook/useTags';

const TAGS: string[] = ['React', 'Next.js', 'Tailwind', 'JavaScript', 'CSS'];

const DynamicInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    inputValue,
    tags,
    addTagAtPosition,
    removeTag,
    handleInputChange,
    error,
    clearInput,
  } = useTags();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const position = selectedIndex === null ? tags.length : selectedIndex + 1;
      addTagAtPosition(inputValue.trim(), position, true);
      setSelectedIndex(position);
      clearInput();
    } else if (e.key === 'Backspace') {
      if (inputValue === '') {
        if (selectedIndex !== null && selectedIndex > -1) {
          removeTag(selectedIndex);
          setSelectedIndex(selectedIndex - 1);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      if (selectedIndex === null) {
        setSelectedIndex(tags.length - 1);
      } else if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedIndex(null);
      }
    } else if (e.key === 'ArrowRight') {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < tags.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else {
        setSelectedIndex(null);
      }
    }
  };

  const handleSuggestionClick = (tagName: string) => {
    const position = selectedIndex === null ? tags.length : selectedIndex + 1;
    addTagAtPosition(tagName, position, false);
    setSelectedIndex(position);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTagClick = (index: number) => {
    setSelectedIndex(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className='flex'>
      <div
        ref={containerRef}
        className='flex flex-wrap w-full items-center border rounded-md p-2'
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTagClick(index)}
            className={`${
              tag.isTyped ? 'bg-transparent' : 'bg-green-800'
            } mb-2 mr-2 px-2.5 py-0.5 rounded-xl flex items-center ${
              selectedIndex === index ? 'outline outline-blue-500' : ''
            }`}
          >
            {tag.name}
            <button
              type='button'
              onClick={() => {
                removeTag(index);
                if (selectedIndex === index) {
                  setSelectedIndex(null);
                }
              }}
              className='bg-transparent hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full ml-1'
            >
              ×
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
          onFocus={() => setSelectedIndex(null)}
        />
        {error && <div className='text-red-500'>{error}</div>}
      </div>
      <div className='flex flex-wrap m-2'>
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleSuggestionClick(tag)}
            className='px-3 py-1 bg-green-800 rounded-full text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ml-2'
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DynamicInput;
