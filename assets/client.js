jQuery(function($) {



    /** hiện câu trả lời của câu hỏi thường gặp */
    $(".question li").click(function(e) {
        e.preventDefault();
        let isOpen = $(this).find(".reply").hasClass("open");
        $(".reply").removeClass("open");
        if (isOpen) { $(this).find(".reply").addClass("open"); }
        $(this).find(".reply").toggleClass("open");
    });
    /** ********************* */

    /** drop dow menu tính năng  */
    $(".menu-item-has-children").on("click", function(e) {
        let select = $(this).find(".sub-menu");
        $(select[0]).toggleClass("show");
    });
    $(".sub-menu").mouseleave(function() { $(this).removeClass("show"); });
    /** ************************ */

    /** dấu 3 gạch menu khi chế độ mobile */
    $(".btn-mobile").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("show");
        $("#menu-top").toggleClass("active");
        $("body").toggleClass("no-scroll");
    });
    /** ********************* */

    /** bẳng drop dow tính nằng */
    $("#overlay").click(function(e) {
        $(".btn-mobile").removeClass("show");
        $("#menu-top").removeClass("active");
        $("body").removeClass("no-scroll");
    });
    /** ********************* */


    /** thanh tìm kiếm */
    $("#search-btn").click(function(e) { $("#search-box").toggleClass("show-box"); });
    /** ********************* */


    /**show bảng model */
    /**model của liên hệ sale header */
    $(".btn-modal").click(function(e) {
        e.preventDefault();
        var idModal = "#modal-" + $(this).data("modal");
        $(idModal).toggleClass("show-modal");
        $("#overlay-modal").toggleClass("show-ovelay");
        $("body").toggleClass("no-scroll");
    });


    /** hỗ trợ cho modal opacity */
    $("#overlay-modal").click(function(e) {
        e.preventDefault();
        $(this).removeClass("show-ovelay");
        $(".modal").removeClass("show-modal");
        $("body").removeClass("no-scroll");
    });

    /** nút X tắt modal */
    $(".modal-close").click(function(e) {
        e.preventDefault();
        $("body").removeClass("no-scroll");
        var btnClose = $(this).parents(".modal");
        $("#" + btnClose.attr("id")).removeClass("show-modal");
        $("#overlay-modal").removeClass("show-ovelay");
        $(".modal").removeClass("show-modal");
        $(".field").removeClass("has-error");
        $(".msg-error").text("");
    });

    /************* */

    /** carousel */
    new Swiper(".slider-recommended", { freeMode: true, spaceBetween: 30, pagination: { el: ".recommended__paginate", clickable: true, }, navigation: { nextEl: ".related-slider-next", prevEl: ".related-slider-prev", }, });
    /****** */


    /** bảng tap của bảng mở rộng các tính năng */
    $(".tabs li").click(function(e) {
        e.preventDefault();
        var tab_name = $(this).data("name");
        $(".tab").removeClass("show");
        $(".tabs li").removeClass("active");
        $(this).addClass("active");
        $("#tab-" + tab_name).addClass("show");
    });

    /********* */






});