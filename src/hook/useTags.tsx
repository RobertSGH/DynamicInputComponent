import { useState, useCallback, ChangeEvent } from 'react';

export type Tag = {
  name: string;
  isTyped: boolean;
};

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const addTag = useCallback(
    (tagName: string, isTyped: boolean) => {
      if (tags.some((tag) => tag.name === tagName)) {
        setError('Duplicate tags are not allowed.');
        return;
      }
      if (tagName === '') {
        setError('Tag cannot be empty.');
        return;
      }
      setTags((prevTags) => [...prevTags, { name: tagName, isTyped }]);
      setInputValue('');
    },
    [tags]
  );

  const removeTag = useCallback((index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setError(null);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const clearInput = useCallback(() => {
    setInputValue('');
  }, []);

  const addTagAtPosition = (
    tag: string,
    position: number,
    isTyped: boolean
  ) => {
    if (
      tags.some(
        (existingTag) => existingTag.name.toLowerCase() === tag.toLowerCase()
      )
    ) {
      setError('Tag already exists');
      return;
    }
    const updatedTags = [...tags];
    updatedTags.splice(position, 0, { name: tag, isTyped });
    setTags(updatedTags);
  };

  return {
    addTagAtPosition,
    tags,
    inputValue,
    error,
    addTag,
    removeTag,
    handleInputChange,
    clearInput,
  };
};
