"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBoundingRect = (clientRects) => {
    const rects = Array.from(clientRects).map((rect) => {
        const { left, top, width, height, pageNumber } = rect;
        const X0 = left;
        const X1 = left + width;
        const Y0 = top;
        const Y1 = top + height;
        return { X0, X1, Y0, Y1, pageNumber };
    });
    let firstPageNumber = Number.MAX_SAFE_INTEGER;
    rects.forEach((rect) => {
        var _a;
        firstPageNumber = Math.min(firstPageNumber, (_a = rect.pageNumber) !== null && _a !== void 0 ? _a : firstPageNumber);
    });
    const rectsWithSizeOnFirstPage = rects.filter((rect) => (rect.X0 > 0 || rect.X1 > 0 || rect.Y0 > 0 || rect.Y1 > 0) &&
        rect.pageNumber === firstPageNumber);
    const optimal = rectsWithSizeOnFirstPage.reduce((res, rect) => {
        return {
            X0: Math.min(res.X0, rect.X0),
            X1: Math.max(res.X1, rect.X1),
            Y0: Math.min(res.Y0, rect.Y0),
            Y1: Math.max(res.Y1, rect.Y1),
            pageNumber: firstPageNumber,
        };
    }, rectsWithSizeOnFirstPage[0]);
    const { X0, X1, Y0, Y1, pageNumber } = optimal;
    return {
        left: X0,
        top: Y0,
        width: X1 - X0,
        height: Y1 - Y0,
        pageNumber,
    };
};
exports.default = getBoundingRect;
//# sourceMappingURL=get-bounding-rect.js.map