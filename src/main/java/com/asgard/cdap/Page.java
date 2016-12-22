package com.asgard.cdap;

import java.util.List;

public class Page {
	//分页大小默认值为10条
		public static final int DEFAULT_PAGE_SIZE = 10;

		//总数据条数
		private int totalCount = 0;

		//当前页开始条数
		private int startCount = 0;

		//当前页结束条数
		private int endCount = 0;

		//每页显示条数
		private int pageSize = DEFAULT_PAGE_SIZE;

		//当前页数
		private int pageNo = 1;

		//总页数
		private int totalPage = 1;

		//首页
		private int firstPage = 1;

		//前页
		private int prevPage = 1;

		//后页
		private int nextPage = 1;

		//尾页
		private int lastPage = 1;
		
		//数据集
		private List<?> results;

		public Page(int pageNo, int pageSize, int totalCount) {

			if (pageNo < 1) {
				pageNo = 1;
			}

			if (pageSize < 1) {
				pageSize = 1;
			}

			if (totalCount < 0) {
				totalCount = 0;
			}

			if (totalCount == 0) {
				totalPage = 1;
				firstPage = 1;
				lastPage = totalPage;
				prevPage = 1;
				nextPage = 1;
				startCount = 0;
				endCount = 0;

			} else {
				totalPage = totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1;
				firstPage = 1;
				lastPage = totalPage;

				if (pageNo > totalPage) {
					prevPage = 1;
					nextPage = 1;
					startCount = 0;
					endCount = 0;
				} else {
					prevPage = pageNo == firstPage ? pageNo : pageNo - 1;
					nextPage = pageNo == lastPage ? pageNo : pageNo + 1;
					startCount = (pageNo - 1) * pageSize + 1;
					endCount = pageNo * pageSize < totalCount ? pageNo * pageSize : totalCount;
				}

			}

			this.pageNo = pageNo;
			this.pageSize = pageSize;
			this.totalCount = totalCount;

		}

		public boolean isFirstPage() {

			return pageNo == firstPage;

		}

		public boolean isLastPage() {

			return pageNo == lastPage;

		}

		public boolean hasNextPage() {

			return pageNo < lastPage;

		}

		public boolean hasPrevPage() {

			return pageNo > firstPage;

		}

		public int getTotalCount() {
			return totalCount;
		}

		public int getStartCount() {
			return startCount;
		}

		public int getEndCount() {
			return endCount;
		}

		public int getPageSize() {
			return pageSize;
		}

		public int getPageNo() {
			return pageNo;
		}

		public int getTotalPage() {
			return totalPage;
		}

		public int getFirstPage() {
			return firstPage;
		}

		public int getPrevPage() {
			return prevPage;
		}

		public int getNextPage() {
			return nextPage;
		}

		public int getLastPage() {
			return lastPage;
		}

		public List<?> getResults() {
			return results;
		}

		public void setResults(List<?> results) {
			this.results = results;
		}

		@Override
		public String toString() {
			return "MyPage [totalCount=" + totalCount + ", startCount=" + startCount + ", endCount="
					+ endCount + ", pageSize=" + pageSize + ", pageNo=" + pageNo + ", totalPage="
					+ totalPage + ", firstPage=" + firstPage + ", prevPage=" + prevPage + ", nextPage="
					+ nextPage + ", lastPage=" + lastPage + "]";
		}

		public static void main(String[] args) {
			Page page = new Page(7, 10, 110);
			System.out.println(page);
		}

}
