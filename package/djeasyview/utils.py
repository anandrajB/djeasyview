import io

from django.core.paginator import Paginator
from django.db.models import QuerySet
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from .response import SuccessResponse


def paginator(serializer, per_page):
    return Paginator(message_parser(serializer), per_page=per_page)


def message_parser(data):
    result_data = JSONRenderer().render(data)
    init_streams = io.BytesIO(result_data)
    return JSONParser().parse(init_streams)


def paginated_views(
    page_size: str, page_number: str, serializer_class: Serializer, queryset: QuerySet
) -> Response:
    paginator = Paginator(queryset, page_size)
    paginated_data = paginator.page(page_number)
    serialized_data = serializer_class(paginated_data, many=True).data

    return SuccessResponse(
        {
            "total_pages": paginator.num_pages,
            "total_count": paginator.count,
            "queryset_count": len(paginated_data),
            "data": serialized_data,
        }
    )
