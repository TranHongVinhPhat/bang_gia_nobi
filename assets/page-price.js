(() => {
    var __webpack_exports__ = {};
    /*!******************************!*\
    !*** ./client/page-price.js ***!
    \******************************/
    jQuery(function($) {
        function formatMoney(number) { return number.toLocaleString("vi-VN", { style: "currency", currency: "VND", }); }

        // function convertString(str) {
        //     str = str.toLowerCase();
        //     str = str.trim();
        //     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        //     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        //     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        //     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        //     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        //     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        //     str = str.replace(/đ/g, "d");
        //     str = str.replace(/\W+/g, " ");
        //     str = str.replace(/\s/g, "_");
        //     return str;
        // }

        // function checkValueEmpty() { $(".item-package").toArray().forEach(function(elm) { if ($(elm).val() == 0) { $(elm).parent().css("display", "none"); } else { $(elm).parent().css("display", "block"); } }); }
        // checkValueEmpty();

        /** nut len tren + so dien thoai */
        $("#back-to-top").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "300");
        });

        /**nut tang don vi amount */
        $(".amount .up").click(function(e) {
            e.preventDefault();
            $(this).css("background", "#c7e3ff");
            $(this).delay(800).css("background", "");
            var inputSel = $(this).closest(".amount").find("input[type=number]");
            var sel = $(inputSel[0]);
            sel.attr("value", sel.val());
            $(this).next().attr("disabled", false);
            var valIndex = sel.data("index");
            var priceChange = sel.data("change");
            if (parseInt(sel.val()) >= 0) { $(".input-" + sel.data("package") + valIndex).parent().show(); }
            var selectSum = $(".basic" + sel.data("package"));
            var sum_change = parseInt(selectSum.val()) + priceChange;
            let listItems = $(".custom-package").toArray();
            var start_init = [];
            listItems.forEach((item, index) => { let result = $(item).data("start"); if ($(item).val() > 0 && result > 0 && $(item).val() <= 1) { start_init.push(result); } else { start_init.splice(index, 1); } });
            let price_start = start_init.reduce((a, b) => a + b, 0);
            $(".basic" + sel.data("package")).val(sum_change + price_start);
            $(".sum" + sel.data("package")).text(formatMoney(sum_change + price_start));
            $(".input-" + sel.data("package") + valIndex).attr("value", sel.val());
            $(this).next().attr("data-value", sel.val());
            if ($(".item-cart-" + sel.data("package")).is(":checked")) { $(".total-custom-" + sel.data("package")).text(formatMoney(12 * sum_change + (price_start * 12)) + "/năm"); } else { $(".total-custom-" + sel.data("package")).text(formatMoney(6 * sum_change + (price_start * 6)) + "/năm"); }
            return false;
        });

        /**nut giam don vi amount */
        $(".amount .down").click(function(e) {
            e.preventDefault();
            var inputSel = $(this).closest(".amount").find("input[type=number]");
            var sel = $(inputSel[0]);
            $(sel).attr("value", sel.val());
            if (parseInt(sel.val()) == $(this).data("min")) { $(this).attr("disabled", true); }
            var valIndex = sel.data("index");
            $(".input-" + sel.data("package") + valIndex).attr("value", sel.val());
            if (parseInt(sel.val()) <= 0) { $(".input-" + sel.data("package") + valIndex).parent().toggle("hide"); }
            var priceChange = parseInt(sel.data("change"));
            var selectSum = $(".basic" + sel.data("package")).val();
            var sale_change = sel.val() == 0 ? parseInt($(this).data("init")) : 0;
            var sum_total = selectSum - priceChange - sale_change;
            $(".sum" + sel.data("package")).text(formatMoney(sum_total));
            $(".basic" + sel.data("package")).attr("value", sum_total);
            $(".basic" + sel.data("package")).val(sum_total);
            if ($(".item-cart-" + sel.data("package")).is(":checked")) { $(".total-custom-" + sel.data("package")).text(formatMoney(12 * sum_total) + "/năm"); } else { $(".total-custom-" + sel.data("package")).text(formatMoney(6 * sum_total) + "/năm"); }
        });

        /** cho cac tab duoc hien len mau cam  */
        $("#control-package li").click(function(e) {
            e.preventDefault();
            $("#control-package li").removeClass("active");
            $(this).addClass("active");
        });

        /** nut nhay qua laij cua thang 6 thang 12 */
        $(".input-checked").change(function(e) {
            e.preventDefault();
            var package_name = $(this).data("package");
            var price_6m = $(this).data("6m");
            var price_12m = $(this).data("12m");
            var price_current = $(this).val();
            if ($(this).is(":checked")) {
                var end12m = (price_current * parseInt(price_12m)) / 100;
                $("#price-" + package_name).html("<strong>".concat(formatMoney(end12m), "</strong>"));
                $(".item-" + package_name).toArray().forEach(function(elm) { if ($(elm).data("time") == package_name + "-12") { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
            } else {
                $(".item-" + package_name).toArray().forEach(function(elm) { if ($(elm).data("time") == package_name + "-6") { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
                var end6m = (price_current * (100 - parseInt(price_6m))) / 100;
                $("#price-" + package_name).text("".concat(formatMoney(end6m)));
                console.log(end6m);
            }
        });

        /** phan tinh toan cua tuy chinh goi */
        $(".input-checked-custom").change(function(e) {
            var package_name = $(this).data("package");
            var price_6m = $(this).data("6m");
            var price_current = $(this).data("price");
            var price_12m = $(this).data("12m");
            $(".item-custom-" + package_name).toArray().forEach(function(elm) { if ($(elm).data("time") == package_name + "-12") { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
            if ($(this).is(":checked")) {
                var end12m = parseInt(price_current) -
                    (parseInt(price_current) * (100 - parseInt(price_12m))) / 100;
                $(".package-custom-" + package_name).attr("value", end12m);
                $(".sum" + package_name).text(formatMoney(end12m));
                $(".basic" + package_name).val(end12m);
                var sum12m = end12m * 12;
                $(".total-custom-" + package_name).html("<strong>".concat(formatMoney(sum12m), "/n\u0103m</strong>"));
                var resetValues = $(".custom-package").toArray();
                resetValues.forEach(function(elm) {
                    var valCurrent = $(elm).data("current");
                    $(elm).val(valCurrent);
                });
                var resetItems = $(".item-package").toArray();
                resetItems.forEach(function(elm) {
                    var valCurrent = $(elm).data("current");
                    $(elm).attr("value", valCurrent);
                });
            } else {
                $(".item-custom-" + package_name).toArray().forEach(function(elm) { if ($(elm).data("time") == package_name + "-6") { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
                var end6m = parseInt(price_current) -
                    (parseInt(price_current) * parseInt(price_6m)) / 100;
                $(".package-custom-" + package_name).attr("value", end6m);
                $(".sum" + package_name).text(formatMoney(end6m));
                $(".basic" + package_name).val(end6m);
                var sum6m = end6m * 6;
                $(".total-custom-" + package_name).html("<strong>".concat(formatMoney(sum6m), "/6 th\xE1ng</strong>"));
                var resetValues = $(".custom-package").toArray();
                resetValues.forEach(function(elm) {
                    var valCurrent = $(elm).data("current");
                    $(elm).val(valCurrent);
                });
                var resetItems = $(".item-package").toArray();
                resetItems.forEach(function(elm) {
                    var valCurrent = $(elm).data("current");
                    $(elm).attr("value", valCurrent);
                });
            }
        });


        /**tab cac goi thanh phan menutab  */
        $(".tab").click(function(e) {
            e.preventDefault();
            var tab = $(this).data("tab");
            var arrTabs = $(".content").toArray();
            arrTabs.forEach(function(elm) { if ($(elm).data("main") == tab) { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
            var arrBoxs = $(".content-custom").toArray();
            arrBoxs.forEach(function(elm) { if ($(elm).data("main") == tab) { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
        });

        // $(".custom-package").change(function(e) {
        //     e.preventDefault();
        //     if ($(this).val() < parseInt($(this).attr("min"))) { $(this).attr("value", parseInt($(this).attr("min")));
        //         $(this).val(parseInt($(this).attr("min"))); return false; }
        //     var valIndex = $(this).data("index");
        //     var priceChange = $(this).data("change");
        //     var selectSum = $(".basic" + $(this).data("package"));
        //     var value = $(".input-" + $(this).data("package") + valIndex).val();
        //     if ($(this).val() > value) { var sum_change = parseInt(selectSum.val()) + priceChange;
        //         $(".basic" + $(this).data("package")).val(sum_change);
        //         $(".sum" + $(this).data("package")).text(formatMoney(sum_change)); } else { var sum_change = parseInt(selectSum.val()) - priceChange;
        //         $(".basic" + $(this).data("package")).val(sum_change);
        //         $(".sum" + $(this).data("package")).text(formatMoney(sum_change)); }
        //     $(".input-" + $(this).data("package") + valIndex).attr("value", $(this).val());
        // });

        /**nhay sang cac goi da chon  */
        // $(".neo-custom").click(function(e) {
        //     let nameSelect = $(this).data("package");
        //     let list_controls = $("#control-package li").toArray();
        //     let content_controls = $(".content-custom").toArray();
        //     let custom_controls = $(".box-detail__pay").toArray();
        //     list_controls.forEach((elm) => { if ($(elm).data("tab") === nameSelect) { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
        //     content_controls.forEach((elm) => { if ($(elm).data("main") === nameSelect) { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
        //     custom_controls.forEach((elm) => { if ($(elm).data("main") === nameSelect) { $(elm).addClass("active"); } else { $(elm).removeClass("active"); } });
        // });
    });
})();