import React, { useState } from 'react';
import CreatePostBox from './CreatePostBox';
import PostContainer from './PostContainer';
import { faker } from '@faker-js/faker';
import PostForm from '../../components/PostForm';
import Feed from '../../components/Feed';
// import { TPostView } from '../../types/post';

const ProfilePage = () => {
  const [postsView, setPostsView] = useState('listView');
  return (
    <div className="h-full w-full ">
      <div className="h-auto w-full bg-[#f7f7f7] dark:bg-[#18191a]">
        <div className="mx-auto h-full max-w-6xl rounded-md  dark:bg-neutral-800">
          <div
            className="relative h-[28.75rem] max-h-[28.75rem] w-full rounded-lg"
            style={{
              backgroundImage: `url('https://images3.alphacoders.com/132/1322308.jpeg')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute flex w-full items-center justify-center"
              style={{ bottom: '-15px' }}
            >
              <div className="absolute bottom-[30px] right-[30px]">
                <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold hover:bg-gray-50 focus:outline-none">
                  <i className="fas fa-camera mr-2"></i>Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto h-full px-10">
            <div className="flex items-end gap-5 border-b pb-5 dark:border-stone-700">
              <div className="z-10 -mt-8 h-[10.25rem] w-[10.25rem]">
                <img
                  className="h-full w-full rounded-full border-4 border-primary object-cover"
                  src="https://i.ytimg.com/vi/KJ78T9BrnFM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA00OWvTfeI-aVK8i4JKDiUQdbZ3Q"
                  alt="dp"
                />
              </div>
              <div className="flex-1 flex-col pb-2">
                <p className="text-[2rem] font-bold text-black dark:text-gray-200">
                  Mai Minh Hoàng
                </p>
                <a className="cursor-pointer text-sm font-semibold text-gray-600 hover:underline dark:text-gray-300">
                  528 bạn bè
                </a>
                <div className="flex w-full items-center justify-between">
                  <div className="mt-2 flex items-center">

                    {
                      Array.from({ length: 5 }).map((_, index) => (
                        <img
                          className="cursor-pointer rounded-full border-2 border-white dark:border-neutral-600 w-8 h-8 -ml-2"
                          alt="friend"
                          src={faker.image.avatar()}
                        />
                      ))
                    }
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none">
                      <i className="fas fa-plus-circle mr-2"></i>Add to Story
                    </button>
                    <button className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                      <i className="fas fa-pen mr-2"></i>Sửa trang cá nhân
                    </button>
                    <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between  ">
              <div className="mb-2 flex items-center space-x-2">
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Bài viết
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Giới thiệu
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Bạn bè
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Ảnh
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Reels
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Video
                </button>
                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                  Nhóm
                </button>
              </div>
              <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* After bio content */}
      <div className="mx-auto my-3 h-full max-w-6xl">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 text-gray-600 shadow dark:bg-neutral-800 dark:text-gray-300">
              <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
                Giới thiệu
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center">
                  <p className="text-sm">I'm ...</p>
                  <a
                    href="https://maiminhhoang.id.vn"
                    target="__blank"
                    rel="noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    https://maiminhhoang.com
                  </a>
                </div>
                <button className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  Sửa tiểu sử
                </button>
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fas fa-briefcase text-[1.25rem] text-gray-400"></i>
                  </span>
                  <p>Software Engineer</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fas fa-graduation-cap text-[1.25rem] text-gray-400"></i>
                  </span>
                  <p>
                    Đang học tại{' '}
                    <span className="font-semibold">
                      Đại học Bách Khoa Hà Nội
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fas fa-home text-[1.25rem] text-gray-400"></i>
                  </span>
                  <p>
                    Sống tại <span className="font-semibold">Hà Nội</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fas fa-map-marker-alt text-[1.25rem] text-gray-400"></i>
                  </span>
                  <p>
                    Tới từ{' '}
                    <span className="font-semibold">
                      Quỳnh Lưu, Nghệ An, Việt Nam
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fas fa-heart text-[1.25rem] text-gray-400"></i>
                  </span>
                  <p>
                    <span className="font-semibold">Độc thân</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fab fa-facebook text-[1.25rem] text-gray-400"></i>
                  </span>
                  <a
                    className="cursor-pointer hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={'https://www.facebook.com/hoang.maiminh.146?locale=vi_VN'}
                  >
                    <p>hoang.maiminh146</p>
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <i className="fab fa-instagram text-[1.25rem] text-gray-400"></i>
                  </span>
                  <a
                    className="cursor-pointer hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={'https://www.instagram.com/hoang215381'}
                  >
                    <p>Mai Minh Hoàng</p>
                  </a>
                </div>
              </div>

              <div>
                <button className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  Chỉnh sửa chi tiết
                </button>
              </div>

              <div className="flex items-center gap-3">
                <img
                  className="cursor-pointer rounded-lg"
                  alt="featured"
                  src="https://random.imagecdn.app/120/215"
                />
                <img
                  className="cursor-pointer rounded-lg"
                  alt="featured"
                  src="https://random.imagecdn.app/120/215"
                />
                <img
                  className="cursor-pointer rounded-lg"
                  alt="featured"
                  src="https://random.imagecdn.app/120/215"
                />
              </div>

              <div>
                <button className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  Thêm nội dung đáng chú ý
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 text-gray-600 dark:text-gray-200 shadow dark:bg-neutral-800">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
                  Hình ảnh
                </p>
                <a className="cursor-pointer text-sm text-primary hover:underline">
                  Xem tất cả ảnh
                </a>
              </div>
              <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/125"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/124"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/123"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/122"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/121"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/120"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/119"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/118"
                />
                <img
                  className="w-full"
                  alt="photo"
                  src="https://random.imagecdn.app/125/117"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 shadow dark:bg-neutral-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
                    Bạn bè
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    528 bạn bè
                  </p>
                </div>
                <a className="cursor-pointer text-sm text-primary hover:underline">
                  Xem tất cả bạn bè
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/125"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 1
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/126"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 2
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/127"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 3
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/128"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 4
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/129"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 5
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/130"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 6
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/131"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 7
                  </p>
                </div>
                <div>
                  <img
                    className="w-full rounded-md"
                    alt="photo"
                    src="https://random.imagecdn.app/125/132"
                  />
                  <p className="mt-2 text-sm text-black dark:text-gray-200">
                    Friend 8
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 " >
            {/* Create post */}
            <PostForm isShow={true} />
            {/* post filter box */}
            <div className="mt-4 rounded-md bg-white p-2 px-3 text-sm shadow dark:bg-neutral-800">
              <div className="flex items-center justify-between border-b pb-2 dark:border-neutral-700">
                <div>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    Bài viết
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                    <i className="fas fa-sliders-h mr-2"></i>Lọc
                  </button>
                  <button className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                    <i className="fas fa-cog mr-2"></i>Quản lý bài viết
                  </button>
                </div>
              </div>
              <div className="-mb-1 mt-1 flex space-x-3">
                <button
                  className={`h-8 flex-1 justify-center space-x-2 rounded-md font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-neutral-700 ${postsView === 'listView'
                    ? 'bg-gray-200 dark:bg-neutral-700'
                    : undefined
                    }`}
                  onClick={() => setPostsView('listView')}
                >
                  <i className="fas fa-bars mr-2"></i>Xem dạng danh sách
                </button>
                <button
                  className={`h-8 flex-1 justify-center space-x-2 rounded-md font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-neutral-700 ${postsView === 'gridView'
                    ? 'bg-gray-200 dark:bg-neutral-700'
                    : undefined
                    }`}
                  onClick={() => setPostsView('gridView')}
                >
                  <i className="fas fa-th-large mr-2"></i>Xem dạng lưới
                </button>
              </div>
            </div>

            {/* user posts */}
            <PostContainer postsView={postsView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;