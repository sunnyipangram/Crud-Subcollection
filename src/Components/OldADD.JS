<div className="add-post-form">
<h1 className="add-post-title">Add New Post</h1>
<form action="" onSubmit={handleSubmitTask}>
  <div className="add-post-input">
    <input
      placeholder="Add Title..."
      type="text"
      ref={title}
      required
    />
    <FaCamera className="icon" />
  </div>
  <div className="add-post-textarea">
    <textarea
      placeholder="Add Post Content..."
      ref={postDetail}
      required
    />
    <AiOutlineAppstore className="icon" />
  </div>
  <label htmlFor="image-upload" className="add-post-image-label">
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      ref={imageInput}
      className="add-post-image-input"
    />
    <FaRegImages className="icon" /> Upload Image
  </label>
  {imageUrl && (
    <img
      src={imageUrl}
      alt="Uploaded"
      className="add-post-image-preview"
    />
  )}
  {progressPercent > 0 && (
    <div>Uploading: {progressPercent.toFixed(2)}%</div>
  )}
  <button type="submit" className="add-post-submit">
    Post <FaUpload />
  </button>
</form>
</div>