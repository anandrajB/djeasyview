from typing import Dict, Union

from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.db.models.query import QuerySet
from rest_framework.serializers import BaseSerializer

# ---------------------------------------------------------------------------------------------------
#
#   Note: Authentication and authorization are required to access these endpoints.
#
# ---------------------------------------------------------------------------------------------------


class BasePostAPIView(ListCreateAPIView):
    model = None
    create_serializer_class = None
    list_serializer_class = None
    select_related = None
    prefetch_related = None
    context = None
    filter = None
    order_by = None

    def get_create_serializer(self, data) -> BaseSerializer:
        return self.create_serializer_class(data=data)

    def get_list_serializer(self, instance) -> BaseSerializer:
        return (
            self.list_serializer_class(instance, context=self.context, many=True)
            if self.context
            else self.list_serializer_class(instance, many=True)
        )

    def get_queryset(self) -> QuerySet:
        queryset = self.model.objects.all()
        if self.filter:
            queryset = queryset.filter(**self.filter)
        if self.select_related:
            queryset = queryset.select_related(*self.select_related)
        if self.prefetch_related:
            queryset = queryset.prefetch_related(*self.prefetch_related)
        return queryset

    def list(self, request, *args, **kwargs) -> Response[Dict[str, Union[str, dict]]]:
        queryset = (
            self.get_queryset().order_by(self.order_by)
            if self.order_by
            else self.get_queryset()
        )
        serializer = self.get_list_serializer(queryset)
        return Response({"status": "Success", "data": serializer.data})

    def post(self, request, *args, **kwargs) -> Response[Dict[str, Union[str, dict]]]:
        serializer = self.get_create_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"status": "Success", "data": serializer.data})
        return Response({"status": "Failure", "data": serializer.errors})


class BaseUpdateAPIView(RetrieveUpdateDestroyAPIView):
    model = None
    retrieve_serializer_class = None
    update_serializer_class = None
    select_related = None
    prefetch_related = None
    context = None
    filter = None

    def get_object(self, pk: int) -> QuerySet:
        queryset = self.model
        if self.select_related:
            queryset = queryset.select_related(*self.select_related)
        if self.prefetch_related:
            queryset = queryset.prefetch_related(*self.prefetch_related)
        return get_object_or_404(queryset, pk=pk, **self.filter)

    def get_retrieve_serializer(self, instance) -> BaseSerializer:
        return self.retrieve_serializer_class(instance)

    def get_update_serializer(self, instance, data) -> BaseSerializer:
        return self.update_serializer_class(instance, data=data)

    def retrieve(
        self, request, pk=None, *args, **kwargs
    ) -> Response[Dict[str, Union[str, dict]]]:
        instance = self.get_object(pk)
        serializer = self.get_retrieve_serializer(instance)
        return Response({"status": "Success", "data": serializer.data})

    def update(
        self, request, pk=None, *args, **kwargs
    ) -> Response[Dict[str, Union[str, dict]]]:
        instance = self.get_object(pk)
        serializer = self.get_update_serializer(instance, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "Success", "data": serializer.data})
        return Response({"status": "Failure", "data": serializer.errors})

    def delete(
        self, request, pk=None, *args, **kwargs
    ) -> Response[Dict[str, Union[str, str]]]:
        self.model.objects.filter(id=pk).delete()
        return Response({"status": "Success", "data": "Deleted Successfully"})
