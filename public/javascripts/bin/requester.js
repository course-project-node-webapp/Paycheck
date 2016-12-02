/* globals $ Promise */

'use strict';

const requester = (function () {
    function getJSON(url, headers) {
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'GET',
                contentType: 'application/json',
                headers: headers
            })
                .done(resolve)
                .fail(reject);
        });
    }

    function postJSON(url, body, headers) {
        headers = headers || {};
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers
            })
                .done(resolve)
                .fail(reject);
        });
    }

    function putJSON(url, body, headers) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers: headers
            })
                .done(resolve)
                .fail(reject);
        });
    }

    return {
        getJSON, postJSON, putJSON
    };
} ());