from django.shortcuts import render

def get_angular_template(request, item=None):
    print(item)
    return render(request, "ang/app/blog-list.html", {})
