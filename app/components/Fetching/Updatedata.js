'use client';

const UpdateButton = () => {
    const handleClick = async () => {
      try {
        const response = await fetch('../../api/updateTimestamps/');
        if (!response.ok) {
          throw new Error('Failed to update timestamps');
        }
        const data = await response.json();
        if (data.success) {
          console.log('Timestamps updated successfully');
        } else {
          throw new Error('Failed to update timestamps');
        }
      } catch (error) {
        console.error('Error updating timestamps:', error);
      }
    };
  
    return (
      <button onClick={handleClick} className="rounded-md bg-blue-500 text-white text-center mx-1">
        Update Timestamps
      </button>
    );
  };
  
  export default UpdateButton;