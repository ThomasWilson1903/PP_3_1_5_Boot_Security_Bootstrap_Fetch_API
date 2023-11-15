$('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Получить кнопку, которая открыла модальное окно
    var name = button.data('name'); // Получить данные из атрибута data-name
    var age  = button.data('age'); // Получить данные из атрибута data-age
    var modal = $(this); // Получить модальное окно

    // Установить данные в соответствующие элементы модального окна
    modal.find('#modal-name').text(name);
    modal.find('#modal-age').text(age);
});
