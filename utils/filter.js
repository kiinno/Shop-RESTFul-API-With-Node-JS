class Pagenation {
  constructor(current = 1, limit, itemsLen = 0) {
    this.limit = limit ?? itemsLen;
    this.current = current;
    this.itemsLen = itemsLen;
  }

  pages() {
    let _pages = this.itemsLen / this.limit;
    if (_pages % 2 !== 0) {
      _pages = Math.ceil(_pages);
    }
    return isNaN(_pages) ? 1 : _pages;
  }

  skip() {
    const _skipped = (this.current - 1 < 0 ? 0 : this.current - 1) * this.limit;
    return _skipped > this.itemsLen ? this.itemsLen : _skipped;
  }

  next() {
    const _pages = this.pages();
    return this.current + 1 <= _pages ? this.current + 1 : null;
  }

  prev() {
    const _prev = this.current - 1;
    return this.current - 1 > 0
      ? _prev > this.pages()
        ? this.pages()
        : _prev
      : null;
  }

  available() {
    const _avail = this.itemsLen - this.skip() - this.limit;
    return _avail < 0 ? 0 : _avail;
  }
}

class QueryFilter {
  constructor(query, req) {
    this.query = query;
    this.req = req;
  }

  pagenation(docs) {
    let { page = 1, limit } = this.req.query;
    page = isNaN(page) ? undefined : +page;
    limit = isNaN(limit) ? undefined : +limit;
    page = page > 0 ? page : 1;
    const _pag = new Pagenation(
      page,
      limit <= 0 ? undefined : limit,
      docs.length
    );
    const _docs = docs.slice(_pag.skip(), _pag.skip() + _pag.limit);
    return {
      documents: _pag.itemsLen,
      resualts: _docs.length,
      pagesCount: _pag.pages(),
      currentPage: _pag.current,
      data: _docs,
      limit: _pag.limit,
      next: _pag.next(),
      prev: _pag.prev(),
      available: _pag.available(),
    };
  }
}

module.exports = QueryFilter;
