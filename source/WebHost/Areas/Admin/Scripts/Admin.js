﻿
var authz = (function () {
    "use strict";

    function showMessage(msg, css) {
        var elem = $("#message");
        if (elem.is(":visible")) {
            elem.clearQueue().fadeOut(function () {
                showMessage(msg, css);
            });
        }
        else {
            elem
                .addClass(css)
                .text(msg)
                .fadeIn()
                .delay(2000)
                .fadeOut(function () {
                    $(this).text("").removeClass(css);
                });
        }
    }
    function showSuccessMessage(msg) {
        showMessage(msg, "alert-success");
    }
    function showErrorMessage(msg) {
        showMessage(msg, "alert-error");
    }

    function Service(path, settings) {
        this.path = path;
        if (this.path.charAt(this.path.length-1) !== '/') {
            this.path += "/";
        }
        this.settings = settings || {};
    }
    Service.prototype.get = function (id) {
        id = id || "";
        var request = $.ajax({
            url: authz.baseUrl + this.path + id,
            type: 'GET'
        });
        return request;
    };
    Service.prototype.put = function (data, id) {
        id = id || "";
        return $.ajax({
            url: authz.baseUrl + this.path + id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).then(
        function(data, status, xhr){
            showSuccessMessage("Update Successful");
            return xhr;
        },
        function(xhr, status, error){
            showErrorMessage("Error Updating");
            return xhr;
        });
    };
    Service.prototype.delete = function (id) {
        id = id || "";
        return $.ajax({
            url: authz.baseUrl + this.path + id,
            type: 'DELETE'
        }).then(
        function(data, status, xhr){
            showSuccessMessage("Delete Successful");
            return xhr;
        },
        function(xhr, status, error){
            showErrorMessage("Error Deleting");
            return xhr;
        });
    };
    Service.prototype.post = function (data, id) {
        id = id || "";
        return $.ajax({
            url: authz.baseUrl + this.path + id,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).then(
        function (data, status, xhr) {
            showSuccessMessage("Create Successful");
            return xhr;
        },
        function (xhr, status, error) {
            showErrorMessage("Error Creating");
            return xhr;
        });
    };

    return {
        Service: Service
    };
})();
